"use server";

import { Car, CarSpent, CarType, User } from "@prisma/client";
import { PrismaService } from "../Prisma";
import { checkNotification } from "../notification";

export const updateUser = async (
  userId: number,
  user: Omit<User, "userId">
) => {
  try {
    return await PrismaService.prismClient.user.update({
      where: {
        userId,
      },
      data: user,
    });
  } catch (error) {
    return Promise.reject("Error");
  }
};
export const updateCar = async (
  carId: number,
  car: Omit<Car, "carId" | "carTypeId" | "userId">
) => {
  try {
    await PrismaService.prismClient.car.update({
      where: {
        carId,
      },
      data: car,
    });
    return checkNotification(carId, car.mileage);
  } catch (error) {
    return Promise.reject("Error");
  }
};
export const updateCarType = async (
  carTypeId: number,
  carType: Omit<CarType, "carTypeId">
) => {
  try {
    return await PrismaService.prismClient.carType.update({
      where: {
        carTypeId,
      },
      data: carType,
    });
  } catch (error) {
    return Promise.reject("Error");
  }
};
export const updateSpent = async (
  carSpentId: number,
  carSpent: Omit<CarSpent, "carId" | "carSpentId">
) => {
  try {
    await PrismaService.prismClient.carSpent.update({
      where: {
        carSpentId,
      },
      data: carSpent,
    });
  } catch (error) {
    return Promise.reject("Error");
  }
};
