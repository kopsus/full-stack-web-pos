"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { TypeTransaction } from "@/types/transaction";
import Receipt from "./Receipt";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const PreviewReceipt = ({ history }: { history: TypeTransaction[] }) => {
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
