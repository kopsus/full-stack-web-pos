"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { TypeTransaksi } from "@/types/transaction";
import Receipt from "./Receipt";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface IPreviewReceipt {
  activeShift?: {
    id: string;
    start_time: Date;
  } | null;
  history: TypeTransaksi[];
}

const PreviewReceipt = ({ history }: IPreviewReceipt) => {
  return (
    <div className="text-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Preview Receipt</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
          <DialogTitle>Preview Receipt</DialogTitle>
          <DialogDescription></DialogDescription>
          <Receipt history={history} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewReceipt;
