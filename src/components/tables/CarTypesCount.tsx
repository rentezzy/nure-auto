"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableSimple } from "../ui/dataTableSimple";
type CarTypesCount = {
  name: string;
  total: bigint;
};
const columns: ColumnDef<CarTypesCount>[] = [
  {
    accessorKey: "name",
    header: "Car",
  },
  {
    accessorFn: (row) => row.total.toString(),
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
