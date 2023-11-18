import { Car, CarType, PrismaClient, User } from "@prisma/client";

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
  getUserByEmail(email: string) {
    return this.prismClient.user.findUnique({ where: { email } });
  },
  getUser(id: number) {
    return this.prismClient.user.findUnique({ where: { userId: id } });
  },
  getUsersId() {
    return this.prismClient.user.findMany({ select: { userId: true } });
  },
  getCars() {
    return this.prismClient.car.findMany();
  },
  getCar(carId: number) {
    return this.prismClient.car.findUnique({
      where: { carId },
      include: {
        carType: {
          include: {
            maintenance: true,
          },
        },
        carSpent: true,
        usage: true,
      },
    });
  },
  getCarsByUserId(uId: number) {
    return this.prismClient.car.findMany({
      where: { userId: uId },
      include: {
        carType: true,
      },
    });
  },
  getCarTypes() {
    return this.prismClient.carType.findMany();
  },
  getCarType(ctId: number) {
    return this.prismClient.carType.findUnique({ where: { carTypeId: ctId } });
  },
  getCarTypesId() {
    return this.prismClient.carType.findMany({ select: { carTypeId: true } });
  },
  getMaintenance(maintenanceId: number) {
    return this.prismClient.maintenance.findUnique({
      where: {
        maintenanceId,
      },
    });
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
