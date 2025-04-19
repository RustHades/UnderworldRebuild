import { pgTable, text, serial, integer, boolean, timestamp, jsonb, foreignKey, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  skinSubmissions: many(skins),
  contactMessages: many(contacts),
  serverAdmins: many(serverAdmins),
  galleryUploads: many(galleryImages),
  changelogEntries: many(changelogEntries),
}));

export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    email: true,
    password: true,
    displayName: true,
  })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type User = typeof users.$inferSelect;

// Skin submissions table
export const skins = pgTable("skins", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  steamId: text("steam_id").notNull(),
  skinName: text("skin_name").notNull(),
  skinUrl: text("skin_url").notNull(),
  itemType: text("item_type").notNull(),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  reviewedBy: integer("reviewed_by").references(() => users.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const skinsRelations = relations(skins, ({ one }) => ({
  user: one(users, {
    fields: [skins.userId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [skins.reviewedBy],
    references: [users.id],
  }),
}));

export const insertSkinSchema = z.object({
  steamId: z.string().min(1),
  skinName: z.string().min(3),
  skinUrl: z.string().url()
    .refine((url) => url.includes("steamcommunity.com") || url.includes("rustlabs.com")),
  itemType: z.string().min(1),
  reason: z.string().min(10).max(500),
});

export type InsertSkin = z.infer<typeof insertSkinSchema>;
export type Skin = typeof skins.$inferSelect;

// Contact submissions table
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  discordId: text("discord_id"),
  steamId: text("steam_id"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  adminResponse: text("admin_response"),
  respondedBy: integer("responded_by").references(() => users.id, { onDelete: "set null" }),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow(),
  isResolved: boolean("is_resolved").default(false),
});

export const contactsRelations = relations(contacts, ({ one }) => ({
  user: one(users, {
    fields: [contacts.userId],
    references: [users.id],
  }),
  responder: one(users, {
    fields: [contacts.respondedBy],
    references: [users.id],
  }),
}));

export const insertContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  discordId: z.string().optional(),
  steamId: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10).max(1000),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Discord links table
export const discordLinks = pgTable("discord_links", {
  id: serial("id").primaryKey(), 
  title: text("title").notNull(),
  description: text("description"),
  inviteCode: text("invite_code").notNull(),
  inviteUrl: text("invite_url").notNull(),
  serverIcon: text("server_icon"),
  serverName: text("server_name").notNull(),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertDiscordLinkSchema = createInsertSchema(discordLinks)
  .pick({
    title: true,
    description: true,
    inviteCode: true,
    inviteUrl: true,
    serverIcon: true,
    serverName: true,
    displayOrder: true,
    isActive: true,
  });

export type InsertDiscordLink = z.infer<typeof insertDiscordLinkSchema>;
export type DiscordLink = typeof discordLinks.$inferSelect;

// Game servers table
export const gameServers = pgTable("game_servers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  ipAddress: text("ip_address").notNull(),
  port: integer("port").notNull(),
  connectLink: text("connect_link").notNull(),
  serverType: text("server_type").notNull(), // e.g., vanilla, modded, etc.
  mapName: text("map_name").notNull(),
  mapSize: text("map_size"),
  playerCount: integer("player_count").default(0),
  maxPlayers: integer("max_players").default(0),
  wipeSchedule: text("wipe_schedule"),
  features: jsonb("features").$type<string[]>().default([]),
  bannerImage: text("banner_image"),
  status: text("status").default("online"), // online, offline, wiping, etc.
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const serverAdmins = pgTable("server_admins", {
  serverId: integer("server_id").notNull().references(() => gameServers.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("admin"), // owner, admin, moderator
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.serverId, table.userId] }),
  };
});

export const serverAdminsRelations = relations(serverAdmins, ({ one }) => ({
  server: one(gameServers, {
    fields: [serverAdmins.serverId],
    references: [gameServers.id],
  }),
  user: one(users, {
    fields: [serverAdmins.userId],
    references: [users.id],
  }),
}));

export const gameServersRelations = relations(gameServers, ({ many }) => ({
  admins: many(serverAdmins),
}));

export const insertGameServerSchema = createInsertSchema(gameServers)
  .pick({
    name: true,
    description: true,
    ipAddress: true,
    port: true,
    connectLink: true,
    serverType: true,
    mapName: true,
    mapSize: true,
    maxPlayers: true,
    wipeSchedule: true,
    features: true,
    bannerImage: true,
    displayOrder: true,
    isActive: true,
  });

export type InsertGameServer = z.infer<typeof insertGameServerSchema>;
export type GameServer = typeof gameServers.$inferSelect;

// Gallery images table
export const galleryCategories = pgTable("gallery_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const galleryCategoriesRelations = relations(galleryCategories, ({ many }) => ({
  images: many(galleryImages),
}));

export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  categoryId: integer("category_id").references(() => galleryCategories.id, { onDelete: "set null" }),
  imageUrl: text("image_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  fileSize: integer("file_size"),
  width: integer("width"),
  height: integer("height"),
  isApproved: boolean("is_approved").default(false),
  approvedBy: integer("approved_by").references(() => users.id, { onDelete: "set null" }),
  approvedAt: timestamp("approved_at"),
  displayOrder: integer("display_order").default(0),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const galleryImagesRelations = relations(galleryImages, ({ one }) => ({
  user: one(users, {
    fields: [galleryImages.userId],
    references: [users.id],
  }),
  approver: one(users, {
    fields: [galleryImages.approvedBy],
    references: [users.id],
  }),
  category: one(galleryCategories, {
    fields: [galleryImages.categoryId],
    references: [galleryCategories.id],
  }),
}));

export const insertGalleryImageSchema = createInsertSchema(galleryImages)
  .pick({
    title: true,
    description: true,
    categoryId: true,
    imageUrl: true,
    thumbnailUrl: true,
    fileSize: true,
    width: true,
    height: true,
    isPublic: true,
  });

export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type GalleryCategory = typeof galleryCategories.$inferSelect;

// Changelog entries table
export const changelogEntries = pgTable("changelog_entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  version: text("version"),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  publishDate: timestamp("publish_date").defaultNow(),
  isPublished: boolean("is_published").default(false),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const changelogEntriesRelations = relations(changelogEntries, ({ one }) => ({
  author: one(users, {
    fields: [changelogEntries.userId],
    references: [users.id],
  }),
}));

export const insertChangelogEntrySchema = createInsertSchema(changelogEntries)
  .pick({
    title: true,
    summary: true,
    content: true,
    version: true,
    publishDate: true,
    isPublished: true,
    tags: true,
  });

export type InsertChangelogEntry = z.infer<typeof insertChangelogEntrySchema>;
export type ChangelogEntry = typeof changelogEntries.$inferSelect;
