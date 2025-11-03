import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  age: integer("age"),
  weight: integer("weight"),
  height: integer("height"),
  gender: text("gender"),
  activityLevel: text("activity_level"),
  workingHours: integer("working_hours"),
  dailyGoal: integer("daily_goal"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url"),
  ingredients: text("ingredients").array(),
  benefits: text("benefits").array(),
  prepTime: text("prep_time"),
  method: text("method").array(),
  temperature: text("temperature"),
  bestTime: text("best_time"),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0"),
  reviewCount: integer("review_count").default(0),
  inStock: boolean("in_stock").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("pending"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("INR"),
  shippingAddress: json("shipping_address"),
  billingAddress: json("billing_address"),
  items: json("items").notNull(),
  paymentProvider: text("payment_provider"),
  paymentStatus: text("payment_status").default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id),
  provider: text("provider").notNull(),
  providerOrderId: text("provider_order_id"),
  providerPaymentId: text("provider_payment_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("INR"),
  status: text("status").notNull().default("initiated"),
  paymentMethod: text("payment_method"),
  upiId: text("upi_id"),
  metadata: json("metadata"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const hydrationLogs = pgTable("hydration_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  note: text("note"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
}).extend({
  email: z.string().email().optional(),
  fullName: z.string().optional(),
});

export const updateUserProfileSchema = createInsertSchema(users).pick({
  email: true,
  fullName: true,
  age: true,
  weight: true,
  height: true,
  gender: true,
  activityLevel: true,
  workingHours: true,
  dailyGoal: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHydrationLogSchema = createInsertSchema(hydrationLogs).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export type InsertHydrationLog = z.infer<typeof insertHydrationLogSchema>;
export type HydrationLog = typeof hydrationLogs.$inferSelect;
