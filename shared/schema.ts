import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Skin submissions table
export const skins = pgTable("skins", {
  id: serial("id").primaryKey(),
  steamId: text("steam_id").notNull(),
  skinName: text("skin_name").notNull(),
  skinUrl: text("skin_url").notNull(),
  itemType: text("item_type").notNull(),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

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
  name: text("name").notNull(),
  email: text("email").notNull(),
  discordId: text("discord_id"),
  steamId: text("steam_id"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isResolved: boolean("is_resolved").default(false),
});

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
