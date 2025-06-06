import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./db/drizzle",
  dialect: 'sqlite',
  //driver: 'd1-http',
  dbCredentials: {
    url: "./db/sqlite.db"
  }
} satisfies Config;