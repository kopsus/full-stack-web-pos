"use client";

import { storeDialogVoucher } from "@/api/voucher/store";
import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import React from "react";

const DialogDelete = () => {
  const [dialog, setDialog] = useAtom(storeDialogVoucher);
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
      titleDelete="Yakin ingin menghapus Voucher ini?"
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
