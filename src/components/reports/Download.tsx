"use client";
import { downloadJs } from "@/services/print";
import { Button } from "../ui/button";

export const Download = () => {
  return (
    <Button
      onClick={downloadJs}
      className="opacity-0 hover:opacity-100 transition-all"
    >
      Download
    </Button>
  );
};
