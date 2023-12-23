import { getCurrentWeekAndYear } from "@/lib/utils";
import { PrismaService } from "./Prisma";
import { SpentType } from "@prisma/client";
export const getMileageByMonth = async (userId: number) => {
  const time = getCurrentWeekAndYear();
  const [{ mileage }] = (await PrismaService.prismClient
    .$queryRaw`select SUM(usage.mileage) as mileage from usage 
  join car on usage.car_id = car.car_id 
  where car.user_id = ${userId} and usage.year = ${
    time.year
  } and week_number > ${time.week - 5} and week_number < ${time.week + 1}`) as [
    {
      mileage: bigint;
    }
  ];
  return mileage ? mileage.toString() : 0;
};
export const getCarsWithTotalSpent = async (userId: number) => {
  const cars = (await PrismaService.prismClient
    .$queryRaw`select car.car_id, car_type.model, car_type.brand, SUM(car_spent.price * car_spent.amount) as total from car 
  join car_type on car.car_type_id = car_type.car_type_id 
  join car_spent on car.car_id= car_spent.car_id
  where car.user_id = ${userId}
  group by car_type.model, car_type.brand, car.car_id;`) as {
    car_id: number;
    model: string;
    brand: string;
    total: number;
  }[];
  return cars.map((car) => ({
    name: `${car.brand} ${car.model}`,
    total: car.total,
  }));
};
export const getCarsTypesCount = async () => {
  const carsCount = (await PrismaService.prismClient
    .$queryRaw`select car_type.model ||' '|| car_type.brand as name, COUNT(car.car_type_id) as total
  from car
  JOIN car_type ON car.car_type_id = car_type.car_type_id
  group by car_type.model, car_type.brand
  having COUNT(car.car_type_id) > 0
  order by total desc;`) as { name: string; total: bigint }[];
  return carsCount;
};

export const getCarSpentFromPrice = async () => {
  const carsSpent = (await PrismaService.prismClient
    .$queryRaw`select car.price,SUM(car_spent.amount*car_spent.price) as total 
  from car
  join car_spent on car_spent.car_id = car.car_id
  group by car.price
  order by car.price asc;`) as { price: number; total: number }[];
  return carsSpent.map((spent) => [spent.price, spent.total]) as [
    number,
    number
  ][];
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
