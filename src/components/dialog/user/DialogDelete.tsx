"use client";

import { storeDialogUser } from "@/api/user/store";
import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import React from "react";

const DialogDelete = () => {
  const [dialog, setDialog] = useAtom(storeDialogUser);
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
      titleDelete="Yakin ingin menghapus Akun ini?"
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
