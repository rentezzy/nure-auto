"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableSimple } from "../ui/dataTableSimple";
type CarTypesCount = {
  brand: string;
  model: string;
  _count: {
    car: number;
  };
};
const columns: ColumnDef<CarTypesCount>[] = [
  {
    accessorFn: (row) => `${row.brand} ${row.model}`,
    header: "Car",
  },
  {
    accessorFn: (row) => row._count.car,
    header: "Total",
  },
];

export const CarTypesCount = ({
  carTypesCount,
}: {
  carTypesCount: CarTypesCount[];
}) => {
  return <DataTableSimple columns={columns} data={carTypesCount} />;
};
