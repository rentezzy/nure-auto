import { PrismaService } from "@/services/Prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const car = await PrismaService.prismClient.car.findUnique({
    where: {
      carId: parseInt(params.id),
    },
  });
  return Response.json({ car });
}
