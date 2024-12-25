import { timestampColumns } from "./utils";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const cars = sqliteTable("cars", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  showLocation: text("show_location").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  ...timestampColumns(),
});

export const carsRelations = relations(cars, ({ one }) => ({
  user: one(users, { fields: [cars.userId], references: [users.id] }),
}));

/***
 *  Auth Table Schemas
 */
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  ...timestampColumns(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: one(accounts),
  cars: many(cars),
}));

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  ...timestampColumns(),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  ...timestampColumns(),
});

export const verifications = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ...timestampColumns(),
});
