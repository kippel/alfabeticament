//import { serial } from "drizzle-orm/mysql-core";
//import { pgTable } from "drizzle-orm/pg-core";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

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





/*
lletra = Column(String)
    numbro = Column(Integer)
    voice = Column(String)
    vocals = Column(String)


*/