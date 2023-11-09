import { addCar } from "./server-actions/addRow";
import { PrismaClient, Car, CarType, User } from "@prisma/client";

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
  getUsersId() {
    return this.prismClient.user.findMany({ select: { userId: true } });
  },
  getCars() {
    return this.prismClient.car.findMany();
  },
  getCarTypes() {
    return this.prismClient.carType.findMany();
  },
  getCarTypesId() {
    return this.prismClient.carType.findMany({ select: { carTypeId: true } });
  },
  addUser(user: Omit<User, "userId">) {
    return this.prismClient.user.create({
      data: user,
    });
  },
  addCar(car: Omit<Car, "carId">) {
    return this.prismClient.car.create({
      data: car,
    });
  },
  addCarType(carType: Omit<CarType, "carTypeId">) {
    return this.prismClient.carType.create({
      data: carType,
    });
  },
};
