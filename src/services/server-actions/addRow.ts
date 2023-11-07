"use server";

import { PrismaService } from "../Prisma";

export const addUser = async (email: string, password: string) => {
  try {
    return await PrismaService.addUser(email, password);
  } catch (error) {
    return Promise.reject("Error");
  }
};
