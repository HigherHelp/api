import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.refreshTokens.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await clearDatabase();
  const users = [];
  const refreshTokens = [];

  for (let i = 0; i < 10; i++) {
    const email = faker.internet.email();
    const name = faker.person.fullName();
    const password = faker.internet.password();
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    users.push(user);

    // Each user will have between 0 to 3 refresh tokens
    const numberOfTokens = faker.number.int({ min: 0, max: 3 });
    for (let j = 0; j < numberOfTokens; j++) {
      const refreshToken = await prisma.refreshTokens.create({
        data: {
          ipAddress: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
          userId: user.id,
        },
      });
      refreshTokens.push(refreshToken);
    }
  }

  console.log(`${users.length} users created.`);
  console.log(`${refreshTokens.length} refresh tokens created.`);
}

try {
  await main();
} catch (error) {
  console.error(error);
  throw new Error('Could not seed the database');
}
await prisma.$disconnect();
