"use client";

import { storeDialogPayment } from "@/api/payment/store";
import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import React from "react";

const DialogDelete = () => {
  const [dialog, setDialog] = useAtom(storeDialogPayment);
  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return (
    <DialogLayout
      show={dialog.type === "DELETE" && dialog.show}
      onHide={closeDialog}
      titleDelete="Yakin ingin menghapus item ini?"
    >
      <div className="flex items-center justify-center gap-5">
        <Button variant={"outline"} onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant={"destructive"} onClick={closeDialog}>
          Delete
        </Button>
      </div>
    </DialogLayout>
  );
};

export default DialogDelete;
