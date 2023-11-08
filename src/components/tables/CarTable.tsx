"use client";
import { Car } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CarEditForm } from "../shared/EditForm";
import { DataTable } from "../ui/dataTable";
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
        <div className="flex justify-end">
          <CarEditForm id={id} />
        </div>
      );
    },
  },
];

export const CarTable = ({ cars }: { cars: Car[] }) => {
  return <DataTable columns={columns} data={cars} />;
};
