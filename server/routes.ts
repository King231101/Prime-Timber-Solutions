import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

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

  try {
    await seedAdmin();
  } catch (err) {
    console.log("Admin seed will run after db migration");
  }

  return httpServer;
}
