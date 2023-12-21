"use server";

import { CarSpent, Gasoline, Usage } from "@prisma/client";
import { PrismaService } from "../Prisma";

const gasolinePrice: Record<Gasoline, number> = {
  D: 1.54,
  A92: 1.48,
  A95: 1.53,
  A98: 1.62,
  A100: 1.75,
};

export const addCarSpent = async (carSpent: Omit<CarSpent, "carSpentId">) => {
  let newCarSpent: Omit<CarSpent, "carSpentId"> = carSpent;
  if (carSpent.type === "MAINTENANCE") {
    if (!carSpent.maintenanceId) return Promise.reject("Error");
    const maintenance = await PrismaService.getMaintenance(
      carSpent.maintenanceId
    );
    if (!maintenance) return Promise.reject("Error");
    newCarSpent = {
      ...carSpent,
      amount: 1,
      description: maintenance.description,
      price: maintenance.price,
    };
  } else {
    newCarSpent = {
      ...carSpent,
      maintenanceId: null,
    };
  }
  try {
    return await PrismaService.prismClient.carSpent.create({
      data: newCarSpent,
    });
  } catch (error) {
    return Promise.reject("Error");
  }
};
export const addWeeklyCarSpent = async (usage: Omit<Usage, "usageId">) => {
  // Mileage 500km
  // Avg gasoline 8.2 / 100 km
  // Gasoline??? = Mileage / 100 * AvgGasoline
  const gasolineAmount = (usage.mileage / 100) * usage.averageGasoline;
  try {
    const gasolineType = await PrismaService.prismClient.car.findUnique({
      where: {
        carId: usage.carId,
      },
      select: {
        mileage: true,
        carType: {
          select: {
            gasoline: true,
          },
        },
      },
    });
    if (!gasolineType) {
      return Promise.reject("Error");
    }
    return PrismaService.prismClient.$transaction([
      PrismaService.prismClient.usage.create({
        data: usage,
      }),
      PrismaService.prismClient.car.update({
        where: { carId: usage.carId },
        data: {
          mileage: gasolineType.mileage + usage.mileage,
        },
      }),
      PrismaService.prismClient.carSpent.create({
        data: {
          amount: gasolineAmount,
          date: new Date(),
          description: "Weekly gasoline.",
          price: gasolinePrice[gasolineType.carType.gasoline],
          type: "GASOLINE",
          carId: usage.carId,
        },
      }),
    ]);
  } catch (error) {
    return Promise.reject("Error");
  }
};
