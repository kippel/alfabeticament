// drizzle/seed.ts
import { db } from './db'; // tu instancia de Drizzle
import { users, courses, userProgress, abcBar, abcList, abcUn, abcDos } from './schema'; // tu esquema
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

  await db.delete(userProgress);
  await db.delete(abcBar);
  await db.delete(abcList);

  await db.delete(abcUn)
  await db.delete(abcDos)

  const user_id = await users_bar()
  const courses_id = await courses_bar()


  await db.insert(userProgress).values({ userId: user_id.lastInsertRowid, activeCourseId: courses_id.lastInsertRowid })
    
    await db.insert(abcBar).values([
        {
            id: 1,
            title: "Monosíl.labs",
            name: "Paraula d’una sola síl·laba",
            coursesId: 1
        },
        {
            id: 2,
            title: "Bisíl·labs",
            name: "Un bisíl·lab és una paraula que té dues síl·labes",
            coursesId: 1
        },
        {
            id: 3,
            title: "Trisílabs",
            name: "Un trisíl·lab és una paraula que té tres síl·labes",
            coursesId: 1
        },
    ]);

    await db.insert(abcList).values([
        {
            id: 1,
            abcId: 1,
            coursesId: 1,
            title: "Monosíl.labs 1"
        },
        {
            id: 2,
            abcId: 1,
            coursesId: 1,
            title: "Monosíl.labs 2"
        },
    ]);

    await db.insert(abcUn).values([
      {
          id: 1,
          abcUnId: 1,
          nom: "dos",
          number: 1,
          number_bar: 1
      },
      {
          id: 2,
          abcUnId: 1,
          nom: "dos",
          number: 2,
          number_bar: 1
      },
      {
          id: 3,
          abcUnId: 1,
          nom: "dos",
          number: 3,
          number_bar: 1
      },
      {
          id: 4,
          abcUnId: 1,
          nom: "dos",
          number: 4,
          number_bar: 1
      },
      {
          id: 5,
          abcUnId: 1,
          nom: "dos",
          number: 5,
          number_bar: 1
      },
      {
          id: 6,
          abcUnId: 1,
          nom: "dos",
          number: 6,
          number_bar: 1
      }

    ]);

     await db.insert(abcDos).values([
        {
          id: 1,
          abcDosId: 1,
          lletres: "pa",
          voice_mp3: "/mp3/hello.mp3",
          vocals_images: "/images/bread.svg",
          number: 1,
          number_bar: 1
        },
        {
          id: 2,
          abcDosId: 1,
          lletres: "sol",
          voice_mp3: "/mp3/hello.mp3",
          vocals_images: "/images/sun.svg",
          number: 2,
          number_bar: 1
        },
        {
          id: 3,
          abcDosId: 1,
          lletres: "ou",
          voice_mp3: "/mp3/hello.mp3",
          vocals_images: "/images/egg.svg",
          number: 3,
          number_bar: 1
        },
        {
          id: 4,
          abcDosId: 1,
          lletres: "col",
          voice_mp3: "/mp3/hello.mp3",
          vocals_images: "/images/cabbage.svg",
          number: 4,
          number_bar: 1
        },
        {
          id: 5,
          abcDosId: 1,
          lletres: "ull",
          voice_mp3: "/mp3/hello.mp3",
          vocals_images: "/images/eye.svg",
          number: 5,
          number_bar: 1
        },
        {
          id: 6,
          abcDosId: 1,
          lletres: "dau",
          voice_mp3: "/mp3/hello.mp3",
          vocals_images: "/images/dice.svg",
          number: 6,
          number_bar: 1
        }
     ]);




}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error ejecutando seed:', err);
    process.exit(1);
  });

