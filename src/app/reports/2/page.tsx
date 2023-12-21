import { SelectReport } from "@/components/reports/Select";

import { PrismaService } from "@/services/Prisma";

const Report = async () => {
  const carTypes = await PrismaService.prismClient.carType.findMany({
    where: {
      car: {
        some: {
          carSpent: {
            some: {
              type: "REPAIR",
            },
          },
        },
      },
    },
  });
  return (
    <section className="container mx-auto space-x-2 flex flex-col items-center">
      <h1 className="text-center text-[36px] font-medium">
        Road accident&apos;s from mileage report
      </h1>
      <SelectReport carTypes={carTypes} />
    </section>
  );
};
export default Report;
