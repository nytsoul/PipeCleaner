import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@pipebloom.com";
  const password = "Admin@123";

  // Check if admin already exists
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    // Update role and password in case they need refreshing
    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: { email },
      data: {
        password: hashed,
        role: "ADMIN",
        name: "Admin",
      },
    });
    console.log(`✅ Admin user updated: ${email}`);
  } else {
    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        name: "Admin",
        email,
        password: hashed,
        role: "ADMIN",
      },
    });
    console.log(`✅ Admin user created: ${email}`);
  }

  console.log(`🔑 Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
