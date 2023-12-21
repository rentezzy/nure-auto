"use client";

import { SpentType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableSimple } from "../ui/dataTableSimple";
type CarSpentByCarType = {
  name: string;
  spent: Record<SpentType, number>;
};

const columns: ColumnDef<CarSpentByCarType>[] = [
  {
    accessorKey: "name",
    header: "Car",
  },
  {
    accessorFn: (row) => row.spent.GASOLINE + " $",
    header: "Gasoline",
  },
  {
    accessorFn: (row) => row.spent.MAINTENANCE + " $",
    header: "Maintenance",
  },
  {
    accessorFn: (row) => row.spent.INSURANCE + " $",
    header: "Insurance",
  },
  {
    accessorFn: (row) => row.spent.OTHER + " $",
    header: "Other",
  },
];

export const SaveReports = ({
  carSpentByCarType,
}: {
  carSpentByCarType: CarSpentByCarType[];
}) => {
  return (
    <>
      <DataTableSimple columns={columns} data={carSpentByCarType} />
    </>
  );
};
