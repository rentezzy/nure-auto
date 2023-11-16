import { useGetCarTypes } from "@/hooks/useGetCarTypesId";
import { CarType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Control } from "react-hook-form";
import { CarTypeDataTable } from "../ui/carTypeDataTable";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const columns: ColumnDef<CarType>[] = [
  {
    id: "select",
    cell: ({ row }) => {
      const id: string = row.getValue("carTypeId");
      return (
        <RadioGroup>
          <RadioGroupItem
            checked={row.getIsSelected()}
            onClick={() => row.toggleSelected()}
            value={id}
            id={id}
          />
        </RadioGroup>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
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
];

export const CarTypeSelect = ({ control }: { control: Control<any, any> }) => {
  const carTypes = useGetCarTypes();
  return (
    <FormField
      control={control}
      name="carTypeId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select which car you are own</FormLabel>
          <FormControl>
            {carTypes && (
              <CarTypeDataTable
                data={carTypes}
                columns={columns}
                onChange={field.onChange}
                selected={field.value}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
