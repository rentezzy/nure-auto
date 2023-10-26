import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export const PrismaService = {
  prismClient: globalForPrisma.prisma ?? prismaClientSingleton(),
  getUsers() {
    return this.prismClient.user.findMany();
  },
  addUser(email:string,password:string) {
    return this.prismClient.user.create({
      data: {
        email,
        password,
      },
    });
  },
};
