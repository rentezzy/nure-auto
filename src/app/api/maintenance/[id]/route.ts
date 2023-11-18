import { PrismaService } from "@/services/Prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const car = await PrismaService.prismClient.car.findUnique({
    where: {
      carId: parseInt(params.id),
    },
    select: {
      carSpent: {
        select: {
          maintenanceId: true,
        },
      },
      carType: {
        select: {
          maintenance: {
            select: {
              maintenanceId: true,
              condition: true,
            },
          },
        },
      },
    },
  });
  if (!car) return Response.json({ error: "Car doesn't exist" });
  const alreadyDone = car.carSpent.map((spent) => spent.maintenanceId);
  const willDone = car.carType.maintenance.filter(
    (mt) => !alreadyDone.includes(mt.maintenanceId)
  );
  return Response.json({ maintenance: willDone });
}
