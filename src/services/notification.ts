import { PrismaService } from "./Prisma";

export const checkNotification = async (carId: number, mileage: number) => {
  const car = await PrismaService.getCar(carId);
  if (!car) return;
  const maintenance = await PrismaService.prismClient.maintenance.findFirst({
    where: {
      AND: [
        { carTypeId: car.carTypeId },
        {
          condition: {
            gte: mileage,
            lte: mileage + 1000,
          },
        },
      ],
    },
  });
  if (!maintenance) return;
  const spent = await PrismaService.prismClient.carSpent.findFirst({
    where: {
      AND: [
        {
          carId,
        },
        {
          maintenanceId: maintenance.maintenanceId,
        },
      ],
    },
  });
  if (spent) return;
  const message = `Your ${car.carType.brand} ${car.carType.model} will soon need maintenance as it reaches ${maintenance.condition} km's....${carId}`;
  const messages = await PrismaService.prismClient.notification.findFirst({
    where: {
      text: {
        equals: message,
      },
    },
  });
  if (messages) return;
  return PrismaService.prismClient.notification.create({
    data: {
      sendAt: new Date(),
      text: message,
      title: `${car.carType.brand} ${car.carType.model} maintenance notification.`,
      userId: car.userId,
    },
  });
};
