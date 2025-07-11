import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { abecedaris, abecedarin, abecedn } from './codes/abecedaris';
import { users } from './codes/users';
const prisma = new PrismaClient();

async function main() {
  //const hashedPassword = await bcrypt.hash('admin123', 10);
/*
  const user = await prisma.user.create({
    data: {
      name: 'Admin4',
      password: hashedPassword,
    },
  });
  */

  await prisma.user.deleteMany();

  for (let user_u of users) {
    // Check if user already exists

    const hashedPassword = await bcrypt.hash(user_u.password, 10);

    await prisma.user.create({
      data: {
        id: user_u.id,
        name: user_u.name,
        email: user_u.email,
        password: hashedPassword
      }
    });
  }

  await prisma.abecedari_abc.deleteMany();
        
  for (let abecedari_u of abecedaris){
    await prisma.abecedari_abc.create({
      data: abecedari_u
    });
  }

  await prisma.abecedari_abc_lletres.deleteMany();

  for (let abecedari_i of abecedarin) {
    await prisma.abecedari_abc_lletres.create({
        data: abecedari_i
    });
  }
               
  await prisma.abeced_abc_lletres.deleteMany();
  
  for (let abeced_i of abecedn) {
    await prisma.abeced_abc_lletres.create({
        data: abeced_i
    });
  }
  //console.log('User created or already exists:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });