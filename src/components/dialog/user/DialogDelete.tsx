"use client";

import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/lib/actions/user";
import { storeDialogUser } from "@/types/user";
import { useAtom } from "jotai";
import React from "react";
import { toast } from "react-toastify";

const DialogDelete = () => {
  const [dialog, setDialog] = useAtom(storeDialogUser);
  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await deleteUser(dialog.data?.id!);

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
      titleDelete="Yakin ingin menghapus Akun ini?"
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
