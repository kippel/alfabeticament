// drizzle/seed.ts
import { db } from './db'; // tu instancia de Drizzle
import { users, courses } from './schema'; // tu esquema
//import { eq } from 'drizzle-orm';
import bcrypt from "bcryptjs"


async function users_bar() {
    const hashedPassword = await bcrypt.hash("qwerty", 12)

    const data = {
        name: "kippel",
        email: "emai@l.com",
        password: hashedPassword,
    }

    //console.log(data)
    const user_id = await db.insert(users).values(data);
    console.log(user_id.lastInsertRowid)

    return user_id;



}


async function courses_bar() {
    const courses_id = await db.insert(courses).values({ title: "Catala", imageSrc: "/flag/Catala.svg" });
    await db.insert(courses).values({ title: "Español", imageSrc: "/flag/Espanol.svg" });

    return courses_id;
}


async function main() {

  await db.delete(users);
  await db.delete(courses);

  const user_id = await users_bar()
  const courses_id = await courses_bar()

}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error ejecutando seed:', err);
    process.exit(1);
  });

