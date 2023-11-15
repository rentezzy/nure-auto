"use server";

import { PrismaService } from "../Prisma";

export const deleteUser = async (userId: number) => {
  try {
    return await PrismaService.prismClient.user.delete({ where: { userId } });
  } catch (error) {
    return Promise.reject("Error");
  }
};
export const deleteCar = async (carId: number) => {
  try {
    return await PrismaService.prismClient.car.delete({ where: { carId } });
  } catch (error) {
    return Promise.reject("Error");
  }
};
export const deleteCarType = async (carTypeId: number) => {
  try {
    return await PrismaService.prismClient.carType.delete({
      where: { carTypeId },
    });
  } catch (error) {
    return Promise.reject("Error");
  }
};
