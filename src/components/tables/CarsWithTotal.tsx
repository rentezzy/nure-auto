"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableSimple } from "../ui/dataTableSimple";
type CarWithTotal = {
  name: string;
  total: number;
};
const columns: ColumnDef<CarWithTotal>[] = [
  {
    accessorKey: "name",
    header: "Car",
  },
  {
    accessorFn: (row) => `${row.total} $`,
    header: "Total",
  },
];

export const CarsWithTotalTable = ({
  carsWithTotal,
}: {
  carsWithTotal: CarWithTotal[];
}) => {
  return <DataTableSimple columns={columns} data={carsWithTotal} />;
};
