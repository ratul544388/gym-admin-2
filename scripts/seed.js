const { PrismaClient } = require("@prisma/client");
const { placeholderMembers } = require("./placeholder-date");
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    placeholderMembers.map(async (member) => {
      await prisma.member.upsert({
        where: {
          memberId: member.memberId,
        },
        update: member,
        create: member,
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seed Successfull");
  })
  .catch(async (e) => {
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
