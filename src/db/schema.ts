//import { serial } from "drizzle-orm/mysql-core";
//import { pgTable } from "drizzle-orm/pg-core";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull()
});


export const courses = sqliteTable("courses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull()
})

export const coursesRelations = relations(courses, ({many}) => ({
  userProgress: many(userProgress),
}));


export const userProgress = sqliteTable("user_progress", {
  userId: integer("id").primaryKey({ autoIncrement: true }),
  activeCourseId: integer("active_course_id") //.references(() => courses.id, { onDelete: "cascade"})
})

export const userProgressRelations = relations(userProgress, ({ one}) => 
({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));


export const abcBar = sqliteTable("abc_bar", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    name: text("name").notNull(),
    coursesId: integer("courses_id")
});


export const abcBarRelations = relations(abcBar, ({ one}) => 
({
  activeCourse: one(courses, {
    fields: [abcBar.coursesId],
    references: [courses.id],
  }),
}));

export const abcList = sqliteTable("abc_list", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  abcId: integer("abc_id"),
  coursesId: integer("courses_id"),
  title: text("title").notNull()
});


export const abcUn = sqliteTable("abc_un", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  abcUnId: integer("abc_un_id"),
  nom: text("nom"),
  number: integer("number"),
  number_bar: integer("number_bar")
});

export const abcDos = sqliteTable("abc_dos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  abcDosId: integer("abc_dos_id"),
  number: integer("number"),
  number_bar: integer("number_bar"),
  lletres: text("lletres"),
  voice: text("voice"),
  vocals: text("vocals")
});


