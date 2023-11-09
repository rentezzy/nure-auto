"use server";

import { Car, CarType, User } from "@prisma/client";
import { PrismaService } from "../Prisma";

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
export const updateCar = async (carId: number, car: Omit<Car, "carId">) => {
  try {
    return await PrismaService.prismClient.car.update({
      where: {
        carId,
      },
      data: car,
    });
  } catch (error) {
    console.log(error);
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