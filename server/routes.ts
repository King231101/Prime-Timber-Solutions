import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, phoneLoginSchema, verifyCodeSchema, registerUserSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

const verificationCodes: Map<string, { code: string; expires: number }> = new Map();

async function seedAdmin() {
  const existing = await storage.getAdminByEmail("alexdenson231@gmail.com");
  if (!existing) {
    const hashed = await bcrypt.hash("Admintimber11", 10);
    await storage.createAdmin({
      email: "alexdenson231@gmail.com",
      password: hashed,
    });
    console.log("Admin user seeded successfully");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);

  app.post("/api/admin/login", async (req, res) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid email or password format" });
      }

      const { email, password } = parsed.data;
      const admin = await storage.getAdminByEmail(email);

      if (!admin) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      (req.session as any).adminId = admin.id;
      (req.session as any).adminEmail = admin.email;

      return res.json({ success: true, email: admin.email });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/me", (req, res) => {
    if (!(req.session as any)?.adminId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    return res.json({
      id: (req.session as any).adminId,
      email: (req.session as any).adminEmail,
    });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      return res.json({ success: true });
    });
  });

  app.get("/api/admin/users", async (req, res) => {
    if (!(req.session as any)?.adminId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const users = await storage.getAllAppUsers();
      const allCompanies = await storage.getAllCompanies();
      const usersWithCompanies = users.map(user => ({
        ...user,
        companies: allCompanies.filter(c => c.userId === user.id),
      }));
      return res.json(usersWithCompanies);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/send-code", async (req, res) => {
    try {
      const parsed = phoneLoginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid phone number" });
      }

      const { phone } = parsed.data;
      const code = String(Math.floor(100000 + Math.random() * 900000));

      verificationCodes.set(phone, {
        code,
        expires: Date.now() + 5 * 60 * 1000,
      });

      console.log(`[DEV] Verification code for ${phone}: ${code}`);

      return res.json({ success: true, message: "Code sent", devCode: code });
    } catch (error) {
      console.error("Send code error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/verify-code", async (req, res) => {
    try {
      const parsed = verifyCodeSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid code format" });
      }

      const { phone, code } = parsed.data;
      const stored = verificationCodes.get(phone);

      if (!stored || stored.code !== code || Date.now() > stored.expires) {
        return res.status(401).json({ message: "Invalid or expired code" });
      }

      verificationCodes.delete(phone);

      let user = await storage.getAppUserByPhone(phone);
      const isNewUser = !user;

      if (!user) {
        user = await storage.createAppUser({ phone, isRegistered: false });
      }

      (req.session as any).appUserId = user.id;

      return res.json({
        success: true,
        isNewUser: isNewUser || !user.isRegistered,
        user,
      });
    } catch (error) {
      console.error("Verify code error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const parsed = registerUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid registration data" });
      }

      const { phone, firstName, lastName, dateOfBirth } = parsed.data;
      let user = await storage.getAppUserByPhone(phone);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user = await storage.updateAppUser(user.id, {
        firstName,
        lastName,
        dateOfBirth,
        isRegistered: true,
      });

      (req.session as any).appUserId = user.id;

      return res.json({ success: true, user });
    } catch (error) {
      console.error("Register error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/user/me", async (req, res) => {
    const userId = (req.session as any)?.appUserId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const user = await storage.getAppUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/user/me", async (req, res) => {
    const userId = (req.session as any)?.appUserId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const allowedFields = ["firstName", "lastName", "unitPreference", "profileImageUrl"];
      const sanitized: Record<string, any> = {};
      for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
          sanitized[key] = req.body[key];
        }
      }
      const user = await storage.updateAppUser(userId, sanitized);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/user/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      return res.json({ success: true });
    });
  });

  app.get("/api/companies", async (req, res) => {
    const userId = (req.session as any)?.appUserId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const userCompanies = await storage.getCompaniesByUserId(userId);
      return res.json(userCompanies);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/companies", async (req, res) => {
    const userId = (req.session as any)?.appUserId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const company = await storage.createCompany({
        ...req.body,
        userId,
      });
      return res.json(company);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/companies/:id", async (req, res) => {
    const userId = (req.session as any)?.appUserId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const company = await storage.getCompanyById(req.params.id);
      if (!company || company.userId !== userId) {
        return res.status(404).json({ message: "Company not found" });
      }
      const updated = await storage.updateCompany(req.params.id, req.body);
      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/companies/:id/team", async (req, res) => {
    const userId = (req.session as any)?.appUserId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const company = await storage.getCompanyById(req.params.id);
      if (!company || company.userId !== userId) {
        return res.status(404).json({ message: "Company not found" });
      }
      const members = await storage.getTeamMembersByCompanyId(req.params.id);
      return res.json(members);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/companies/:id/team", async (req, res) => {
    const userId = (req.session as any)?.appUserId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const company = await storage.getCompanyById(req.params.id);
      if (!company || company.userId !== userId) {
        return res.status(404).json({ message: "Company not found" });
      }
      const member = await storage.createTeamMember({
        ...req.body,
        companyId: req.params.id,
      });
      return res.json(member);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/companies/:companyId/team/:memberId", async (req, res) => {
    const userId = (req.session as any)?.appUserId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const company = await storage.getCompanyById(req.params.companyId);
      if (!company || company.userId !== userId) {
        return res.status(404).json({ message: "Company not found" });
      }
      await storage.deleteTeamMember(req.params.memberId);
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  try {
    await seedAdmin();
  } catch (err) {
    console.log("Admin seed will run after db migration");
  }

  return httpServer;
}
