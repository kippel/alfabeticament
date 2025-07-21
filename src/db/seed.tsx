import { db } from './db';
import { users, courses, userProgress } from './schema';
import bcrypt from "bcryptjs"

async function users_bar() {
    const hashedPassword = await bcrypt.hash("qwerty", 12)

    const data = {
        id: 1,
        name: "kippel",
        password: hashedPassword,
    }

    await db.insert(users).values(data);

}

async function courses_bar() {
    await db.insert(courses).values({ id: 1,title: "Catala", imageSrc: "/flag/Catala.svg", courses: "ca" });
    await db.insert(courses).values({ id: 2,title: "Español", imageSrc: "/flag/Espanol.svg", courses: "es" });
}

async function user_progress(){
    await db.insert(userProgress).values({
        id: 1,
        userId: 1,
        coursesTitle: "Catala",
        imageSrc: "/flag/Catala.svg", 
        courses: "ca"
    });
}



async function main() {
    await db.delete(users);
    await db.delete(courses);

    await db.delete(userProgress);

    await users_bar()
    await courses_bar()

    await user_progress()
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error ejecutando seed:', err);
    process.exit(1);
  });