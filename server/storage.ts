import {
  adminUsers, type AdminUser, type InsertAdminUser,
  appUsers, type AppUser, type InsertAppUser,
  companies, type Company, type InsertCompany,
  teamMembers, type TeamMember, type InsertTeamMember,
  contactRequests, type ContactRequest, type InsertContactRequest,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  createAdmin(admin: InsertAdminUser): Promise<AdminUser>;

  getAppUserByPhone(phone: string): Promise<AppUser | undefined>;
  getAppUserById(id: string): Promise<AppUser | undefined>;
  createAppUser(user: InsertAppUser): Promise<AppUser>;
  updateAppUser(id: string, data: Partial<InsertAppUser>): Promise<AppUser>;
  getAllAppUsers(): Promise<AppUser[]>;

  getCompaniesByUserId(userId: string): Promise<Company[]>;
  getCompanyById(id: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: string, data: Partial<InsertCompany>): Promise<Company>;
  getAllCompanies(): Promise<Company[]>;

  getTeamMembersByCompanyId(companyId: string): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  deleteTeamMember(id: string): Promise<void>;

  createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
  getAllContactRequests(): Promise<ContactRequest[]>;
}

export class DatabaseStorage implements IStorage {
  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return admin || undefined;
  }

  async createAdmin(admin: InsertAdminUser): Promise<AdminUser> {
    const [created] = await db.insert(adminUsers).values(admin).returning();
    return created;
  }

  async getAppUserByPhone(phone: string): Promise<AppUser | undefined> {
    const [user] = await db.select().from(appUsers).where(eq(appUsers.phone, phone));
    return user || undefined;
  }

  async getAppUserById(id: string): Promise<AppUser | undefined> {
    const [user] = await db.select().from(appUsers).where(eq(appUsers.id, id));
    return user || undefined;
  }

  async createAppUser(user: InsertAppUser): Promise<AppUser> {
    const [created] = await db.insert(appUsers).values(user).returning();
    return created;
  }

  async updateAppUser(id: string, data: Partial<InsertAppUser>): Promise<AppUser> {
    const [updated] = await db.update(appUsers).set(data).where(eq(appUsers.id, id)).returning();
    return updated;
  }

  async getAllAppUsers(): Promise<AppUser[]> {
    return db.select().from(appUsers);
  }

  async getCompaniesByUserId(userId: string): Promise<Company[]> {
    return db.select().from(companies).where(eq(companies.userId, userId));
  }

  async getCompanyById(id: string): Promise<Company | undefined> {
    const [company] = await db.select().from(companies).where(eq(companies.id, id));
    return company || undefined;
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const [created] = await db.insert(companies).values(company).returning();
    return created;
  }

  async updateCompany(id: string, data: Partial<InsertCompany>): Promise<Company> {
    const [updated] = await db.update(companies).set(data).where(eq(companies.id, id)).returning();
    return updated;
  }

  async getAllCompanies(): Promise<Company[]> {
    return db.select().from(companies);
  }

  async getTeamMembersByCompanyId(companyId: string): Promise<TeamMember[]> {
    return db.select().from(teamMembers).where(eq(teamMembers.companyId, companyId));
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [created] = await db.insert(teamMembers).values(member).returning();
    return created;
  }

  async deleteTeamMember(id: string): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    const [created] = await db.insert(contactRequests).values(request).returning();
    return created;
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return db.select().from(contactRequests);
  }
}

export const storage = new DatabaseStorage();
