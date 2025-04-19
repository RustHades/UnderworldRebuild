import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSkinSchema, insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";
import { hasPermission } from "./utils";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  setupAuth(app);
  
  // Submit skin request endpoint
  app.post("/api/submit-skin", async (req, res) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
      const validatedData = insertSkinSchema.parse(req.body);
      const result = await storage.insertSkin(validatedData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  // Get all skins
  app.get("/api/skins", async (req, res) => {
    try {
      const skins = await storage.getAllSkins();
      res.json(skins);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const result = await storage.insertContact(validatedData);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  // Get all contacts
  app.get("/api/contacts", async (req, res) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    // Only admins can get all contacts
    if (!req.user?.role || !hasPermission(req.user.role, "admin")) {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Admin API endpoints for managing content
  
  // Update skin status
  app.patch("/api/skins/:id/status", async (req, res) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    // Only admins can update skin status
    if (!req.user?.role || !hasPermission(req.user.role, "admin")) {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    try {
      const { id } = req.params;
      const { status, adminNotes } = req.body;
      
      if (!id || !status) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const updatedSkin = await storage.updateSkinStatus(
        parseInt(id), 
        status, 
        adminNotes, 
        req.user.id
      );
      
      if (!updatedSkin) {
        return res.status(404).json({ message: "Skin not found" });
      }
      
      res.json(updatedSkin);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Update contact status
  app.patch("/api/contacts/:id/status", async (req, res) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    // Only admins can update contact status
    if (!req.user?.role || !hasPermission(req.user.role, "admin")) {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    try {
      const { id } = req.params;
      const { isResolved, response } = req.body;
      
      if (!id || isResolved === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      const updatedContact = await storage.updateContactStatus(
        parseInt(id), 
        isResolved
      );
      
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      
      // If response is provided, add response
      if (response && storage.respondToContact) {
        await storage.respondToContact(parseInt(id), response, req.user.id);
      }
      
      res.json(updatedContact);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Discord links API endpoints
  app.get("/api/discord-links", async (req, res) => {
    try {
      // Only return active links for non-admin users
      const activeOnly = !req.isAuthenticated() || 
                         !req.user?.role || 
                         !hasPermission(req.user.role, "admin");
      
      if (storage.getDiscordLinks) {
        const links = await storage.getDiscordLinks(activeOnly);
        res.json(links);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Admin-only Discord links API endpoints
  app.post("/api/discord-links", async (req, res) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    // Only admins can create discord links
    if (!req.user?.role || !hasPermission(req.user.role, "admin")) {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    try {
      if (!storage.createDiscordLink) {
        return res.status(501).json({ message: "Feature not implemented" });
      }
      
      const link = await storage.createDiscordLink(req.body);
      res.status(201).json(link);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Game servers API endpoints
  app.get("/api/game-servers", async (req, res) => {
    try {
      // Only return active servers for non-admin users
      const activeOnly = !req.isAuthenticated() || 
                         !req.user?.role || 
                         !hasPermission(req.user.role, "admin");
      
      if (storage.getGameServers) {
        const servers = await storage.getGameServers(activeOnly);
        res.json(servers);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Admin-only Game servers API endpoints
  app.post("/api/game-servers", async (req, res) => {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    // Only admins can create game servers
    if (!req.user?.role || !hasPermission(req.user.role, "admin")) {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    try {
      if (!storage.createGameServer) {
        return res.status(501).json({ message: "Feature not implemented" });
      }
      
      const server = await storage.createGameServer(req.body);
      res.status(201).json(server);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Gallery categories API endpoints
  app.get("/api/gallery-categories", async (req, res) => {
    try {
      if (storage.getGalleryCategories) {
        const categories = await storage.getGalleryCategories();
        res.json(categories);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Gallery images API endpoints
  app.get("/api/gallery-images", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      
      // Only return approved images for non-admin users
      const approvedOnly = !req.isAuthenticated() || 
                           !req.user?.role || 
                           !hasPermission(req.user.role, "admin");
      
      if (storage.getGalleryImages) {
        let images;
        
        if (categoryId && storage.getGalleryImagesByCategory) {
          images = await storage.getGalleryImagesByCategory(categoryId, approvedOnly);
        } else {
          images = await storage.getGalleryImages(approvedOnly);
        }
        
        res.json(images);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Changelog entries API endpoints
  app.get("/api/changelog", async (req, res) => {
    try {
      if (storage.getChangelogEntries) {
        // Only fetch published entries for non-admin users
        const publishedOnly = !req.isAuthenticated() || 
                              !req.user?.role || 
                              !hasPermission(req.user.role, "admin");
        
        const entries = await storage.getChangelogEntries(publishedOnly);
        res.json(entries);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
