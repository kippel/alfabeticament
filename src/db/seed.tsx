// drizzle/seed.ts
import { db } from './db'; // tu instancia de Drizzle
import { users } from './schema'; // tu esquema
//import { eq } from 'drizzle-orm';
import bcrypt from "bcryptjs"

async function main() {

  await db.delete(users); 
  
  const hashedPassword = await bcrypt.hash("qwerty", 12)

  const data = {
    name: "kippel",
    email: "emai@l.com",
    password: hashedPassword,
  }

  //console.log(data)
  await db.insert(users).values(data);
  console.log('⚠️ Seed ya fue ejecutado antes.');

}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error ejecutando seed:', err);
    process.exit(1);
  });

