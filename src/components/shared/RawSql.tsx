"use client";

import { rawQuery } from "@/services/server-actions/rawQuerry";
import { useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "../ui/dataTable";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

export const RawSqlEditor = () => {
  const { toast } = useToast();
  const [rawSql, setRawSql] = useState("");
  const [rawData, setRawData] = useState<unknown>();
  const onClick = async () => {
    try {
      const result = await rawQuery(rawSql);
      setRawData(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Wrong query",
        description: "Wrong query, try something else.",
      });
    }
  };
  return (
    <div className="space-y-4">
      <Textarea value={rawSql} onChange={(e) => setRawSql(e.target.value)} />
      <Button className="w-full" onClick={onClick}>
        Query
      </Button>
      <RawSqlEditorTable rawData={rawData} />
    </div>
  );
};
const RawSqlEditorTable = ({ rawData }: { rawData: unknown }) => {
  if (
    !Array.isArray(rawData) ||
    rawData.length === 0 ||
    typeof rawData[0] !== "object"
  )
    return;
  const columns = Object.keys(rawData[0]).map((header) => ({
    accessorKey: header,
    header,
  }));
  return <DataTable columns={columns} data={rawData} />;
};
