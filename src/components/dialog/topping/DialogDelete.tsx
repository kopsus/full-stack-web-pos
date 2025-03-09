"use client";

import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { deleteTopping } from "@/lib/actions/topping";
import { storeDialogTopping } from "@/types/topping";
import { useAtom } from "jotai";
import React from "react";
import { toast } from "react-toastify";

const DialogDelete = () => {
  const [dialog, setDialog] = useAtom(storeDialogTopping);
  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await deleteTopping(dialog.data?.id!);

    if (res.success) {
      toast.success(res.success.message);
      closeDialog();
    } else {
      toast.error(res.error.message);
    }
  };

  return (
    <DialogLayout
      show={dialog.type === "DELETE" && dialog.show}
      onHide={closeDialog}
      titleDelete="Yakin ingin menghapus Topping ini?"
    >
      <div className="flex items-center justify-center gap-5">
        <Button variant={"outline"} onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </DialogLayout>
  );
};

export default DialogDelete;
