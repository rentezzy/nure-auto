"use server";

import { PrismaService } from "../Prisma";

export const rawQuery = async (query: string) => {
  try {
    return await PrismaService.prismClient.$queryRawUnsafe(query);
  } catch (error) {
    return Promise.reject("Error");
  }
};
