require("dotenv").config()
const { PrismaPg } = require("@prisma/adapter-pg")
const { PrismaClient } = require("@prisma/client")

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter, });

async function test() {
  const users = await prisma.user.findMany();
  console.log(users);
}

test();