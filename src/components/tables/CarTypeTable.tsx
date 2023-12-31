"use client";
import { CarType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CarTypeEditForm } from "../shared/EditElement";
import { Button } from "../ui/button";
import { DataTable } from "../ui/dataTable";
import { CarTypeDeleteForm } from "../shared/DeleteElement";
const columns: ColumnDef<CarType>[] = [
  {
    accessorKey: "carTypeId",
    header: "car_type_id",
  },
  {
    accessorKey: "brand",
    header: "brand",
  },
  {
    accessorKey: "model",
    header: "model",
  },
  {
    accessorKey: "beginYear",
    header: "begin_year",
  },
  {
    accessorKey: "endYear",
    header: "end_year",
  },
  {
    accessorKey: "engine",
    header: "engine",
  },
  {
    accessorKey: "gasoline",
    header: "gasoline",
  },
  {
    accessorKey: "transmission",
    header: "transmission",
  },
  {
    id: "edit-buttons",
    cell(props) {
      const id: string | undefined = props.row.getValue("carTypeId");

      return (
        <div className="flex justify-end items-center gap-2">
          <CarTypeEditForm id={id} />
          <CarTypeDeleteForm id={id} />
          <Button variant="link" asChild>
            <Link href={`/car-type/${id}`}>
              <ChevronRight />
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export const CarTypeTable = ({ carTypes }: { carTypes: CarType[] }) => {
  return <DataTable columns={columns} data={carTypes} />;
};
