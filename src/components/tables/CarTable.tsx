"use client";
import { Car } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CarEditForm } from "../shared/EditElement";
import { Button } from "../ui/button";
import { DataTable } from "../ui/dataTable";
import { CarDeleteForm } from "../shared/DeleteElement";
const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "carId",
    header: "car_id",
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "year",
    header: "year",
  },
  {
    accessorKey: "mileage",
    header: "mileage",
  },
  {
    accessorKey: "buyAt",
    header: "buy_at",
    cell: ({ row }) => {
      const buyAt = new Date(row.getValue("buyAt"));
      const formatted = `${buyAt.getFullYear()}-${
        buyAt.getMonth() + 1
      }-${buyAt.getDate()}`;

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "userId",
    header: "user_id",
  },
  {
    accessorKey: "carTypeId",
    header: "car_type_id",
  },
  {
    id: "edit-buttons",
    cell(props) {
      const id: string | undefined = props.row.getValue("carId");

      return (
        <div className="flex justify-end items-center gap-2">
          <CarEditForm id={id} />
          <CarDeleteForm id={id} />
          <Button variant="link" asChild>
            <Link href={`/car/${id}`}>
              <ChevronRight />
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export const CarTable = ({ cars }: { cars: Car[] }) => {
  return <DataTable columns={columns} data={cars} />;
};
