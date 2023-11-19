"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CarSpent } from "@prisma/client";
import { useState } from "react";
import { SpentCard } from "../cars/CarSpentCard";
import { Input } from "./input";
import { DataTablePagination } from "./table-elements";

const columns: ColumnDef<CarSpent>[] = [
  {
    header: "Type",
    id: "type",
  },
  {
    header: "Spent At",
    id: "spentAt",
  },
  {
    header: "Price/Amount",
    id: "PriceAmount",
  },
  {
    header: "Total",
    id: "total",
  },
  {
    accessorKey: "description",
    header: "Description",
    id: "description",
  },
];

interface DataTableProps<TData, TValue> {
  data: CarSpent[];
}

export function CarSpentDataTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting,
    },
  });
  return (
    <div>
      <div className="max-w-lg">
        <Input
          placeholder="Search by description..."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="flex items-center gap-2 p-2"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="flex items-center w-[200px]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().flatRows.map(({ id, original }) => (
                <TableRow
                  key={id}
                  className="flex w-full gap-2 p-2 items-center transition-all hover:cursor-pointer"
                >
                  <SpentCard spent={original} />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length > 10 && (
        <div className="mt-2">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}
