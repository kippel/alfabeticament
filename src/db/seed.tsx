// drizzle/seed.ts
import { db } from './db'; // tu instancia de Drizzle
import { users } from './schema'; // tu esquema
import { eq } from 'drizzle-orm';
import bcrypt from "bcryptjs"

async function main() {
    const hashedPassword = await bcrypt.hash("password", 12)
    
        const data = {
            name: "kippel_bar",
            email: "emai@l.com",
            password: hashedPassword
        }
    
        //console.log(data)
        const red = await db.insert(users).values(data);
    console.log('⚠️ Seed ya fue ejecutado antes.');
  
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error ejecutando seed:', err);
    process.exit(1);
  });

