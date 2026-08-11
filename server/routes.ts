import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, phoneLoginSchema, verifyCodeSchema, registerUserSchema, insertContactRequestSchema, signupSchema, userLoginSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = "https://primecuttimber.com";
    const pages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/contact", priority: "0.8", changefreq: "monthly" },
      { url: "/talk-to-expert", priority: "0.8", changefreq: "monthly" },
      { url: "/pricing", priority: "0.8", changefreq: "monthly" },
      { url: "/solutions/digital-trip-tickets", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/harvest-management", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/communications", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/scale-ticket-ocr", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/settlements", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/integrations", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/invoicing", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/reporting", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/ai-scale-verification", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/quota-control", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/analytics", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/chain-of-custody", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/fiber-security", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/auditing", priority: "0.7", changefreq: "monthly" },
      { url: "/solutions/eudr-data-export", priority: "0.7", changefreq: "monthly" },
      { url: "/who-we-serve/land-owners", priority: "0.6", changefreq: "monthly" },
      { url: "/who-we-serve/land-managers", priority: "0.6", changefreq: "monthly" },
      { url: "/who-we-serve/loggers", priority: "0.6", changefreq: "monthly" },
      { url: "/who-we-serve/truckers", priority: "0.6", changefreq: "monthly" },
      { url: "/who-we-serve/mills", priority: "0.6", changefreq: "monthly" },
      { url: "/who-we-serve/certification-managers", priority: "0.6", changefreq: "monthly" },
      { url: "/resources/platform", priority: "0.6", changefreq: "monthly" },
      { url: "/resources/case-studies", priority: "0.6", changefreq: "monthly" },
      { url: "/resources/integrations", priority: "0.6", changefreq: "monthly" },
      { url: "/resources/about-us", priority: "0.6", changefreq: "monthly" },
      { url: "/resources/faq", priority: "0.6", changefreq: "monthly" },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid email or password format" });
      }

      const { email, password } = parsed.data;
      const admin = await storage.getAdminByEmail(email.toLowerCase());

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

  app.post("/api/signup", async (req, res) => {
    try {
      const parsed = signupSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: parsed.error.errors[0]?.message || "Invalid signup data" });
      }

      const { firstName, lastName, email, phone, companyName, yearsInCompany, password } = parsed.data;
      const normalizedEmail = email.toLowerCase();

      const existingEmail = await storage.getAppUserByEmail(normalizedEmail);
      if (existingEmail) {
        return res.status(409).json({ message: "An account with this email already exists" });
      }

      const existingPhone = await storage.getAppUserByPhone(phone);
      if (existingPhone) {
        return res.status(409).json({ message: "An account with this phone number already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createAppUser({
        firstName,
        lastName,
        email: normalizedEmail,
        phone,
        companyName,
        yearsInCompany,
        password: hashedPassword,
        isRegistered: true,
      });

      (req.session as any).appUserId = user.id;

      return res.json({ success: true, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/user/login", async (req, res) => {
    try {
      const parsed = userLoginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid email or password format" });
      }

      const { email, password } = parsed.data;
      const user = await storage.getAppUserByEmail(email.toLowerCase());

      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      (req.session as any).appUserId = user.id;

      return res.json({ success: true, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error) {
      console.error("User login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
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

  app.post("/api/contact", async (req, res) => {
    try {
      const parsed = insertContactRequestSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid form data" });
      }
      const request = await storage.createContactRequest(parsed.data);

      // Send email notification via Resend
      const { name, email, phone, message, company } = parsed.data as any;
      try {
        const brandedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Request – Prime Cut Timber</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:10px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#171717;padding:28px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
                    <!-- Logo icon -->
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#ea580c;border-radius:8px;width:40px;height:40px;text-align:center;vertical-align:middle;" width="40" height="40">
                          <img src="https://priimescuttimber.com/favicon.png" width="24" height="24" alt="" style="display:block;margin:8px auto;" onerror="this.style.display='none'" />
                        </td>
                        <td style="padding-left:12px;vertical-align:middle;">
                          <div style="font-family:'Montserrat',Arial,sans-serif;font-size:16px;font-weight:900;letter-spacing:0.5px;color:#ffffff;line-height:1;">PRIME CUT</div>
                          <div style="font-family:'Montserrat',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;color:#ea580c;line-height:1;margin-top:3px;">TIMBER</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <span style="background-color:#ea580c;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:1px;padding:5px 14px;border-radius:20px;text-transform:uppercase;">New Enquiry</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ORANGE ACCENT BAR -->
          <tr>
            <td style="background-color:#ea580c;height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:#ffffff;padding:36px 36px 28px;">
              <h1 style="margin:0 0 6px;font-size:22px;font-weight:800;color:#171717;font-family:'Helvetica Neue',Arial,sans-serif;">New Contact Request</h1>
              <p style="margin:0 0 28px;font-size:14px;color:#6b7280;">Someone reached out through your website. Details below.</p>

              <!-- Info rows -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                <tr style="background-color:#fafafa;">
                  <td style="padding:14px 18px;width:120px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Name</td>
                  <td style="padding:14px 18px;font-size:15px;color:#171717;font-weight:600;border-bottom:1px solid #e5e7eb;">${name || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Email</td>
                  <td style="padding:14px 18px;font-size:15px;border-bottom:1px solid #e5e7eb;"><a href="mailto:${email}" style="color:#ea580c;text-decoration:none;font-weight:600;">${email || "—"}</a></td>
                </tr>
                <tr style="background-color:#fafafa;">
                  <td style="padding:14px 18px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#6b7280;border-bottom:1px solid #e5e7eb;">Phone</td>
                  <td style="padding:14px 18px;font-size:15px;color:#171717;font-weight:600;border-bottom:1px solid #e5e7eb;">${phone || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#6b7280;">Company</td>
                  <td style="padding:14px 18px;font-size:15px;color:#171717;font-weight:600;">${company || "—"}</td>
                </tr>
              </table>

              <!-- Message block -->
              <div style="margin-top:24px;">
                <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#6b7280;margin-bottom:10px;">Message</div>
                <div style="background-color:#fafafa;border:1px solid #e5e7eb;border-left:4px solid #ea580c;border-radius:6px;padding:16px 18px;font-size:15px;color:#374151;line-height:1.65;">${message || "—"}</div>
              </div>

              <!-- CTA -->
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${email}" style="display:inline-block;background-color:#ea580c;color:#ffffff;font-size:14px;font-weight:700;padding:12px 28px;border-radius:6px;text-decoration:none;letter-spacing:0.3px;">Reply to ${name || "this enquiry"}</a>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#171717;padding:20px 36px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#6b7280;">© ${new Date().getFullYear()} Prime Cut Timber · <a href="https://priimescuttimber.com" style="color:#ea580c;text-decoration:none;">priimescuttimber.com</a></p>
              <p style="margin:6px 0 0;font-size:11px;color:#4b5563;">This notification was sent because a visitor submitted the contact form on your website.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        await resend.emails.send({
          from: "Prime Cut Timber <support@priimescuttimber.com>",
          to: "support@priimescuttimber.com",
          subject: `New Contact Request from ${name || email}`,
          html: brandedHtml,
        });
        console.log("Contact notification email sent successfully");
      } catch (emailError) {
        console.error("Failed to send contact notification email:", emailError);
        // Don't fail the request if email fails — contact is still saved
      }

      return res.json({ success: true, request });
    } catch (error) {
      console.error("Contact request error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/admin/contact-requests", async (req, res) => {
    if (!(req.session as any)?.adminId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const requests = await storage.getAllContactRequests();
      return res.json(requests);
    } catch (error) {
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
