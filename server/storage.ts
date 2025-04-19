import { 
  users, skins, contacts, discordLinks, gameServers, serverAdmins, 
  galleryCategories, galleryImages, changelogEntries,
  type User, type InsertUser,
  type Skin, type InsertSkin,
  type Contact, type InsertContact, 
  type DiscordLink, type InsertDiscordLink,
  type GameServer, type InsertGameServer,
  type GalleryImage, type InsertGalleryImage, 
  type GalleryCategory,
  type ChangelogEntry, type InsertChangelogEntry
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, sql, isNull } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // Session store for authentication
  sessionStore: session.Store;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser?(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Skin methods
  insertSkin(skin: InsertSkin): Promise<Skin>;
  getAllSkins(): Promise<Skin[]>;
  getSkinById(id: number): Promise<Skin | undefined>;
  updateSkinStatus?(id: number, status: string, adminNotes?: string, reviewerId?: number): Promise<Skin | undefined>;
  
  // Contact methods
  insertContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  getContactById(id: number): Promise<Contact | undefined>;
  updateContactStatus(id: number, isResolved: boolean): Promise<Contact | undefined>;
  respondToContact?(id: number, response: string, responderId: number): Promise<Contact | undefined>;
  
  // Discord links methods
  getDiscordLinks?(activeOnly?: boolean): Promise<DiscordLink[]>;
  getDiscordLinkById?(id: number): Promise<DiscordLink | undefined>;
  createDiscordLink?(link: InsertDiscordLink): Promise<DiscordLink>;
  updateDiscordLink?(id: number, link: Partial<InsertDiscordLink>): Promise<DiscordLink | undefined>;
  deleteDiscordLink?(id: number): Promise<boolean>;
  
  // Game servers methods
  getGameServers?(activeOnly?: boolean): Promise<GameServer[]>;
  getGameServerById?(id: number): Promise<GameServer | undefined>;
  createGameServer?(server: InsertGameServer): Promise<GameServer>;
  updateGameServer?(id: number, server: Partial<InsertGameServer>): Promise<GameServer | undefined>;
  deleteGameServer?(id: number): Promise<boolean>;
  
  // Gallery categories methods
  getGalleryCategories?(): Promise<GalleryCategory[]>;
  getGalleryCategoryById?(id: number): Promise<GalleryCategory | undefined>;
  createGalleryCategory?(name: string, description?: string): Promise<GalleryCategory>;
  updateGalleryCategory?(id: number, data: Partial<GalleryCategory>): Promise<GalleryCategory | undefined>;
  deleteGalleryCategory?(id: number): Promise<boolean>;
  
  // Gallery images methods
  getGalleryImages?(approvedOnly?: boolean): Promise<GalleryImage[]>;
  getGalleryImageById?(id: number): Promise<GalleryImage | undefined>;
  getGalleryImagesByCategory?(categoryId: number, approvedOnly?: boolean): Promise<GalleryImage[]>;
  createGalleryImage?(image: InsertGalleryImage, userId?: number): Promise<GalleryImage>;
  updateGalleryImage?(id: number, data: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined>;
  approveGalleryImage?(id: number, approverId: number): Promise<GalleryImage | undefined>;
  deleteGalleryImage?(id: number): Promise<boolean>;
  
  // Changelog methods
  getChangelogEntries?(): Promise<ChangelogEntry[]>;
  getChangelogEntryById?(id: number): Promise<ChangelogEntry | undefined>;
  createChangelogEntry?(entry: InsertChangelogEntry, authorId: number): Promise<ChangelogEntry>;
  updateChangelogEntry?(id: number, data: Partial<InsertChangelogEntry>): Promise<ChangelogEntry | undefined>;
  publishChangelogEntry?(id: number): Promise<ChangelogEntry | undefined>;
  unpublishChangelogEntry?(id: number): Promise<ChangelogEntry | undefined>;
  deleteChangelogEntry?(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(userData: InsertUser): Promise<User> {
    const result = await db.insert(users).values({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      displayName: userData.displayName || userData.username,
      role: "user",
    }).returning();
    
    return result[0];
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const result = await db.update(users)
      .set({
        ...userData,
        ...(userData.displayName === "" ? { displayName: null } : {}),
        ...(userData.avatarUrl === "" ? { avatarUrl: null } : {}),
      })
      .where(eq(users.id, id))
      .returning();
      
    return result[0];
  }
  
  // Skin methods
  async insertSkin(skinData: InsertSkin): Promise<Skin> {
    const result = await db.insert(skins).values({
      steamId: skinData.steamId,
      skinName: skinData.skinName,
      skinUrl: skinData.skinUrl,
      itemType: skinData.itemType,
      reason: skinData.reason,
      status: "pending",
      userId: null,
      adminNotes: null,
      reviewedBy: null,
      reviewedAt: null
    }).returning();
    
    return result[0];
  }
  
  async getAllSkins(): Promise<Skin[]> {
    return await db.select().from(skins).orderBy(desc(skins.createdAt));
  }
  
  async getSkinById(id: number): Promise<Skin | undefined> {
    const result = await db.select().from(skins).where(eq(skins.id, id)).limit(1);
    return result[0];
  }
  
  async updateSkinStatus(
    id: number, 
    status: string, 
    adminNotes?: string, 
    reviewerId?: number
  ): Promise<Skin | undefined> {
    const result = await db.update(skins)
      .set({
        status,
        adminNotes: adminNotes || null,
        reviewedBy: reviewerId || null,
        reviewedAt: reviewerId ? new Date() : null,
      })
      .where(eq(skins.id, id))
      .returning();
      
    return result[0];
  }
  
  // Contact methods
  async insertContact(contactData: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values({
      name: contactData.name,
      email: contactData.email,
      discordId: contactData.discordId || null,
      steamId: contactData.steamId || null,
      subject: contactData.subject,
      message: contactData.message,
      userId: null,
      adminResponse: null,
      respondedBy: null,
      respondedAt: null,
      isResolved: false,
    }).returning();
    
    return result[0];
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }
  
  async getContactById(id: number): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
    return result[0];
  }
  
  async updateContactStatus(id: number, isResolved: boolean): Promise<Contact | undefined> {
    const result = await db.update(contacts)
      .set({ isResolved })
      .where(eq(contacts.id, id))
      .returning();
      
    return result[0];
  }
  
  async respondToContact(
    id: number, 
    response: string, 
    responderId: number
  ): Promise<Contact | undefined> {
    const result = await db.update(contacts)
      .set({
        adminResponse: response,
        respondedBy: responderId,
        respondedAt: new Date(),
        isResolved: true,
      })
      .where(eq(contacts.id, id))
      .returning();
      
    return result[0];
  }
  
  // Discord links methods
  async getDiscordLinks(activeOnly: boolean = false): Promise<DiscordLink[]> {
    let query = db.select().from(discordLinks).orderBy(asc(discordLinks.displayOrder));
    
    if (activeOnly) {
      query = query.where(eq(discordLinks.isActive, true));
    }
    
    return await query;
  }
  
  async getDiscordLinkById(id: number): Promise<DiscordLink | undefined> {
    const result = await db.select().from(discordLinks).where(eq(discordLinks.id, id)).limit(1);
    return result[0];
  }
  
  async createDiscordLink(linkData: InsertDiscordLink): Promise<DiscordLink> {
    const result = await db.insert(discordLinks).values({
      title: linkData.title,
      description: linkData.description || null,
      inviteCode: linkData.inviteCode,
      inviteUrl: linkData.inviteUrl,
      serverIcon: linkData.serverIcon || null,
      serverName: linkData.serverName,
      displayOrder: linkData.displayOrder || 0,
      isActive: linkData.isActive !== undefined ? linkData.isActive : true,
    }).returning();
    
    return result[0];
  }
  
  async updateDiscordLink(id: number, linkData: Partial<InsertDiscordLink>): Promise<DiscordLink | undefined> {
    const result = await db.update(discordLinks)
      .set({
        ...linkData,
        updatedAt: new Date(),
      })
      .where(eq(discordLinks.id, id))
      .returning();
      
    return result[0];
  }
  
  async deleteDiscordLink(id: number): Promise<boolean> {
    const result = await db.delete(discordLinks).where(eq(discordLinks.id, id)).returning();
    return result.length > 0;
  }
  
  // Game servers methods
  async getGameServers(activeOnly: boolean = false): Promise<GameServer[]> {
    let query = db.select().from(gameServers).orderBy(asc(gameServers.displayOrder));
    
    if (activeOnly) {
      query = query.where(eq(gameServers.isActive, true));
    }
    
    return await query;
  }
  
  async getGameServerById(id: number): Promise<GameServer | undefined> {
    const result = await db.select().from(gameServers).where(eq(gameServers.id, id)).limit(1);
    return result[0];
  }
  
  async createGameServer(serverData: InsertGameServer): Promise<GameServer> {
    const result = await db.insert(gameServers).values({
      name: serverData.name,
      description: serverData.description,
      ipAddress: serverData.ipAddress,
      port: serverData.port,
      connectLink: serverData.connectLink,
      serverType: serverData.serverType,
      mapName: serverData.mapName,
      mapSize: serverData.mapSize || null,
      maxPlayers: serverData.maxPlayers || 0,
      playerCount: 0,
      wipeSchedule: serverData.wipeSchedule || null,
      features: serverData.features || [],
      bannerImage: serverData.bannerImage || null,
      displayOrder: serverData.displayOrder || 0,
      isActive: serverData.isActive !== undefined ? serverData.isActive : true,
    }).returning();
    
    return result[0];
  }
  
  async updateGameServer(id: number, serverData: Partial<InsertGameServer>): Promise<GameServer | undefined> {
    const result = await db.update(gameServers)
      .set({
        ...serverData,
        updatedAt: new Date(),
      })
      .where(eq(gameServers.id, id))
      .returning();
      
    return result[0];
  }
  
  async deleteGameServer(id: number): Promise<boolean> {
    const result = await db.delete(gameServers).where(eq(gameServers.id, id)).returning();
    return result.length > 0;
  }
  
  // Gallery methods
  async getGalleryCategories(): Promise<GalleryCategory[]> {
    return await db.select().from(galleryCategories).orderBy(asc(galleryCategories.displayOrder));
  }
  
  async getGalleryCategoryById(id: number): Promise<GalleryCategory | undefined> {
    const result = await db.select().from(galleryCategories).where(eq(galleryCategories.id, id)).limit(1);
    return result[0];
  }
  
  async createGalleryCategory(name: string, description?: string): Promise<GalleryCategory> {
    const result = await db.insert(galleryCategories).values({
      name,
      description: description || null,
    }).returning();
    
    return result[0];
  }
  
  async updateGalleryCategory(id: number, data: Partial<GalleryCategory>): Promise<GalleryCategory | undefined> {
    const result = await db.update(galleryCategories)
      .set(data)
      .where(eq(galleryCategories.id, id))
      .returning();
      
    return result[0];
  }
  
  async deleteGalleryCategory(id: number): Promise<boolean> {
    const result = await db.delete(galleryCategories).where(eq(galleryCategories.id, id)).returning();
    return result.length > 0;
  }
  
  async getGalleryImages(approvedOnly: boolean = false): Promise<GalleryImage[]> {
    let query = db.select().from(galleryImages).orderBy(desc(galleryImages.createdAt));
    
    if (approvedOnly) {
      query = query.where(eq(galleryImages.isApproved, true));
    }
    
    return await query;
  }
  
  async getGalleryImageById(id: number): Promise<GalleryImage | undefined> {
    const result = await db.select().from(galleryImages).where(eq(galleryImages.id, id)).limit(1);
    return result[0];
  }
  
  async getGalleryImagesByCategory(categoryId: number, approvedOnly: boolean = false): Promise<GalleryImage[]> {
    let query = db.select()
      .from(galleryImages)
      .where(eq(galleryImages.categoryId, categoryId))
      .orderBy(desc(galleryImages.createdAt));
    
    if (approvedOnly) {
      query = query.where(eq(galleryImages.isApproved, true));
    }
    
    return await query;
  }
  
  async createGalleryImage(imageData: InsertGalleryImage, userId?: number): Promise<GalleryImage> {
    const result = await db.insert(galleryImages).values({
      title: imageData.title,
      description: imageData.description || null,
      userId: userId || null,
      categoryId: imageData.categoryId || null,
      imageUrl: imageData.imageUrl,
      thumbnailUrl: imageData.thumbnailUrl,
      fileSize: imageData.fileSize || null,
      width: imageData.width || null,
      height: imageData.height || null,
      isPublic: imageData.isPublic !== undefined ? imageData.isPublic : true,
      isApproved: false,
      approvedBy: null,
      approvedAt: null,
      displayOrder: 0,
    }).returning();
    
    return result[0];
  }
  
  async updateGalleryImage(id: number, data: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined> {
    const result = await db.update(galleryImages)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(galleryImages.id, id))
      .returning();
      
    return result[0];
  }
  
  async approveGalleryImage(id: number, approverId: number): Promise<GalleryImage | undefined> {
    const result = await db.update(galleryImages)
      .set({
        isApproved: true,
        approvedBy: approverId,
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(galleryImages.id, id))
      .returning();
      
    return result[0];
  }
  
  async deleteGalleryImage(id: number): Promise<boolean> {
    const result = await db.delete(galleryImages).where(eq(galleryImages.id, id)).returning();
    return result.length > 0;
  }
  
  // Changelog methods
  async getChangelogEntries(publishedOnly: boolean = false): Promise<ChangelogEntry[]> {
    let query = db.select().from(changelogEntries).orderBy(desc(changelogEntries.publishDate));
    
    if (publishedOnly) {
      query = query.where(eq(changelogEntries.isPublished, true));
    }
    
    return await query;
  }
  
  async getChangelogEntryById(id: number): Promise<ChangelogEntry | undefined> {
    const result = await db.select().from(changelogEntries).where(eq(changelogEntries.id, id)).limit(1);
    return result[0];
  }
  
  async createChangelogEntry(entryData: InsertChangelogEntry, authorId: number): Promise<ChangelogEntry> {
    const result = await db.insert(changelogEntries).values({
      title: entryData.title,
      summary: entryData.summary,
      content: entryData.content,
      version: entryData.version || null,
      userId: authorId,
      publishDate: entryData.publishDate || new Date(),
      isPublished: entryData.isPublished || false,
      tags: entryData.tags || [],
    }).returning();
    
    return result[0];
  }
  
  async updateChangelogEntry(id: number, data: Partial<InsertChangelogEntry>): Promise<ChangelogEntry | undefined> {
    const result = await db.update(changelogEntries)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(changelogEntries.id, id))
      .returning();
      
    return result[0];
  }
  
  async publishChangelogEntry(id: number): Promise<ChangelogEntry | undefined> {
    const result = await db.update(changelogEntries)
      .set({
        isPublished: true,
        updatedAt: new Date(),
      })
      .where(eq(changelogEntries.id, id))
      .returning();
      
    return result[0];
  }
  
  async unpublishChangelogEntry(id: number): Promise<ChangelogEntry | undefined> {
    const result = await db.update(changelogEntries)
      .set({
        isPublished: false,
        updatedAt: new Date(),
      })
      .where(eq(changelogEntries.id, id))
      .returning();
      
    return result[0];
  }
  
  async deleteChangelogEntry(id: number): Promise<boolean> {
    const result = await db.delete(changelogEntries).where(eq(changelogEntries.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
