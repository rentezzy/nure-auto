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
      const id: string | undefined = props.row.getValue("userId");

      return (
        <div className="w-2">
          <CarEditForm id={id} />
        </div>
      );
    },
  },
];

export const UserTable = ({ cars }: { cars: Car[] }) => {
  return <DataTable columns={columns} data={cars} />;
};
