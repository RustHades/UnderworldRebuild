import { 
  users, type User, type InsertUser,
  skins, type Skin, type InsertSkin,
  contacts, type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Skin methods
  insertSkin(skin: InsertSkin): Promise<Skin>;
  getAllSkins(): Promise<Skin[]>;
  getSkinById(id: number): Promise<Skin | undefined>;
  
  // Contact methods
  insertContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  getContactById(id: number): Promise<Contact | undefined>;
  updateContactStatus(id: number, isResolved: boolean): Promise<Contact | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skins: Map<number, Skin>;
  private contacts: Map<number, Contact>;
  private userIdCounter: number;
  private skinIdCounter: number;
  private contactIdCounter: number;

  constructor() {
    this.users = new Map();
    this.skins = new Map();
    this.contacts = new Map();
    this.userIdCounter = 1;
    this.skinIdCounter = 1;
    this.contactIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Skin methods
  async insertSkin(insertSkin: InsertSkin): Promise<Skin> {
    const id = this.skinIdCounter++;
    const now = new Date();
    const skin: Skin = { 
      ...insertSkin, 
      id,
      status: "pending",
      createdAt: now
    };
    this.skins.set(id, skin);
    return skin;
  }
  
  async getAllSkins(): Promise<Skin[]> {
    return Array.from(this.skins.values());
  }
  
  async getSkinById(id: number): Promise<Skin | undefined> {
    return this.skins.get(id);
  }
  
  // Contact methods
  async insertContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactIdCounter++;
    const now = new Date();
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: now,
      isResolved: false
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  async getContactById(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }
  
  async updateContactStatus(id: number, isResolved: boolean): Promise<Contact | undefined> {
    const contact = await this.getContactById(id);
    if (!contact) return undefined;
    
    const updatedContact: Contact = {
      ...contact,
      isResolved
    };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }
}

export const storage = new MemStorage();
