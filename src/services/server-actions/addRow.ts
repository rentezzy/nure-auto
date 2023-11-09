"use server";

import { Car, CarType, User } from "@prisma/client";
import { PrismaService } from "../Prisma";

export const addUser = async (user: Omit<User, "userId">) => {
  try {
    return await PrismaService.addUser(user);
  } catch (error) {
    return Promise.reject("Error");
  }
};
export const addCar = async (car: Omit<Car, "carId">) => {
  try {
    return await PrismaService.addCar(car);
  } catch (error) {
    return Promise.reject("Error");
  }
};
export const addCarType = async (carType: Omit<CarType, "carTypeId">) => {
  try {
    return await PrismaService.addCarType(carType);
  } catch (error) {
    return Promise.reject("Error");
  }
};
