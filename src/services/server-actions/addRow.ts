"use server";

import { Car, CarType } from "@prisma/client";
import { PrismaService } from "../Prisma";

export const addUser = async (email: string, password: string) => {
  try {
    return await PrismaService.addUser(email, password);
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
