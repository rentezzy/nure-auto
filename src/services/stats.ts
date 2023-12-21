import { getCurrentWeekAndYear } from "@/lib/utils";
import { PrismaService } from "./Prisma";
import { SpentType } from "@prisma/client";
export const getMileageByMonth = async (userId: number) => {
  const time = getCurrentWeekAndYear();
  const weeklySpent = await PrismaService.prismClient.car.findMany({
    select: {
      usage: {
        where: {
          AND: [
            {
              year: time.year,
            },
            {
              weekNumber: {
                lte: time.week,
                gte: time.week - 4,
              },
            },
          ],
        },
        select: {
          mileage: true,
        },
      },
    },
    where: {
      userId,
    },
  });
  let mileage = 0;
  weeklySpent.map((car) =>
    car.usage.map((usage) => (mileage += usage.mileage))
  );
  return mileage;
};
export const getCarsWithTotalSpent = async (userId: number) => {
  const cars = await PrismaService.prismClient.car.findMany({
    where: {
      userId,
    },
    select: {
      carType: {
        select: { brand: true, model: true },
      },
      carSpent: {
        select: {
          amount: true,
          price: true,
        },
      },
    },
  });
  return cars.map((car) => {
    return {
      name: `${car.carType.brand} ${car.carType.model}`,
      total: car.carSpent.reduce(
        (total, spent) => (total += spent.amount * spent.price),
        0
      ),
    };
  });
};
export const getCarsTypesCount = async () => {
  const carsCount = await PrismaService.prismClient.carType.findMany({
    select: {
      brand: true,
      model: true,
      _count: {
        select: {
          car: true,
        },
      },
    },
  });
  return carsCount
    .filter((car) => car._count.car > 0)
    .sort((b, a) => a._count.car - b._count.car);
};
export const getCarSpentFromPrice = async () => {
  const carsSpent = await PrismaService.prismClient.car.findMany({
    select: {
      price: true,
      carSpent: {
        select: {
          amount: true,
          price: true,
        },
      },
    },
  });
  const res = carsSpent
    .map((car) => [
      car.price,
      car.carSpent.reduce(
        (acc, spent) => (acc += spent.amount * spent.price),
        0
      ),
    ])
    .sort((a, b) => a[0] - b[0]);
  return res as [number, number][];
};
export const getCarTypeSpent = async () => {
  const carTypes = await PrismaService.prismClient.carType.findMany({
    select: {
      brand: true,
      model: true,
      car: {
        select: {
          carSpent: {
            select: {
              amount: true,
              type: true,
              price: true,
            },
          },
        },
      },
    },
  });
  const rawCarTypes = carTypes.map((carType) => ({
    name: `${carType.brand} ${carType.model}`,
    spent: carType.car.reduce(
      (acc, car) => {
        const res = car.carSpent.reduce(
          (acc, spent) => {
            acc[spent.type] += spent.amount * spent.price;
            return acc;
          },
          {
            GASOLINE: 0,
            INSURANCE: 0,
            MAINTENANCE: 0,
            OTHER: 0,
            REPAIR: 0,
          } as Record<SpentType, number>
        );
        for (const key in acc) {
          acc[key as keyof typeof acc] += res[key as keyof typeof acc];
        }
        return acc;
      },
      {
        GASOLINE: 0,
        INSURANCE: 0,
        MAINTENANCE: 0,
        OTHER: 0,
        REPAIR: 0,
      } as Record<SpentType, number>
    ),
  }));
  return rawCarTypes.filter(
    (carType) =>
      carType.spent.GASOLINE ||
      carType.spent.INSURANCE ||
      carType.spent.MAINTENANCE ||
      carType.spent.OTHER ||
      carType.spent.REPAIR
  );
};
