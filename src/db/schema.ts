import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  password: text("password").notNull()
});

export const courses = sqliteTable("courses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
  courses: text("courses").notNull()
});

export const userRelations = relations(users, ({one}) => ({
	profile: one(userProgress, {
		fields: [users.id],
		references: [userProgress.userId]
	}),
}));

export const userProgress = sqliteTable("user_progress", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id),
  coursesTitle: text("courses_title").notNull(),
  imageSrc: text("image_src").notNull(),
  courses: text("courses").notNull()
});