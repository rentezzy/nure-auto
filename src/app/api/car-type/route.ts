import { PrismaService } from "@/services/Prisma";

export const GET = async (req: Request) => {
  const carTypes = await PrismaService.getCarTypes();
  return Response.json({ carTypes });
};
