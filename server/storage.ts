import { 
  type User, type InsertUser, type UpdateUserProfile,
  type Product, type InsertProduct,
  type Order, type InsertOrder,
  type Payment, type InsertPayment,
  type HydrationLog, type InsertHydrationLog,
  users, products, orders, payments, hydrationLogs
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(userId: string, profile: Partial<UpdateUserProfile>): Promise<User | undefined>;
  
  getProduct(id: string): Promise<Product | undefined>;
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersByUser(userId: string): Promise<Order[]>;
  updateOrderStatus(orderId: string, status: string, paymentStatus?: string): Promise<Order | undefined>;
  
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentByProviderOrderId(providerOrderId: string): Promise<Payment | undefined>;
  getPaymentsByOrder(orderId: string): Promise<Payment[]>;
  updatePaymentStatus(paymentId: string, status: string, metadata?: any): Promise<Payment | undefined>;
  
  createHydrationLog(log: InsertHydrationLog): Promise<HydrationLog>;
  getHydrationLogsByUser(userId: string, limit?: number): Promise<HydrationLog[]>;
  getUserDailyIntake(userId: string, date: Date): Promise<number>;
}

export class DBStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUserProfile(userId: string, profile: Partial<UpdateUserProfile>): Promise<User | undefined> {
    const result = await db
      .update(users)
      .set({ ...profile })
      .where(eq(users.id, userId))
      .returning();
    return result[0];
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(order).returning();
    return result[0];
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return result[0];
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }

  async updateOrderStatus(
    orderId: string,
    status: string,
    paymentStatus?: string
  ): Promise<Order | undefined> {
    const updateData: any = { status, updatedAt: new Date() };
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }
    
    const result = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, orderId))
      .returning();
    return result[0];
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const result = await db.insert(payments).values(payment).returning();
    return result[0];
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.id, id)).limit(1);
    return result[0];
  }

  async getPaymentByProviderOrderId(providerOrderId: string): Promise<Payment | undefined> {
    const result = await db
      .select()
      .from(payments)
      .where(eq(payments.providerOrderId, providerOrderId))
      .limit(1);
    return result[0];
  }

  async getPaymentsByOrder(orderId: string): Promise<Payment[]> {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.orderId, orderId))
      .orderBy(desc(payments.createdAt));
  }

  async updatePaymentStatus(
    paymentId: string,
    status: string,
    metadata?: any
  ): Promise<Payment | undefined> {
    const updateData: any = { status, updatedAt: new Date() };
    if (metadata) {
      updateData.metadata = metadata;
    }
    
    const result = await db
      .update(payments)
      .set(updateData)
      .where(eq(payments.id, paymentId))
      .returning();
    return result[0];
  }

  async createHydrationLog(log: InsertHydrationLog): Promise<HydrationLog> {
    const result = await db.insert(hydrationLogs).values(log).returning();
    return result[0];
  }

  async getHydrationLogsByUser(userId: string, limit: number = 100): Promise<HydrationLog[]> {
    return await db
      .select()
      .from(hydrationLogs)
      .where(eq(hydrationLogs.userId, userId))
      .orderBy(desc(hydrationLogs.timestamp))
      .limit(limit);
  }

  async getUserDailyIntake(userId: string, date: Date): Promise<number> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const logs = await db
      .select()
      .from(hydrationLogs)
      .where(
        and(
          eq(hydrationLogs.userId, userId),
        )
      );
    
    const filtered = logs.filter(log => {
      const timestamp = new Date(log.timestamp);
      return timestamp >= startOfDay && timestamp <= endOfDay;
    });
    
    return filtered.reduce((sum, log) => sum + log.amount, 0);
  }
}

export const storage = new DBStorage();
