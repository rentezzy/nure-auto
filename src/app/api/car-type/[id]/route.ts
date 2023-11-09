import { PrismaService } from "@/services/Prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const carType = await PrismaService.prismClient.carType.findUnique({
    where: {
      carTypeId: parseInt(params.id),
    },
  });
  return Response.json({ carType });
}
