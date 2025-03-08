"use client";

import { storeDialogTopping } from "@/api/topping/store";
import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import React from "react";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogTopping);

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDialog((prev) => ({
      ...prev,
      data: {
        ...prev.data!,
        [name]: name === "price" ? parseFloat(value) || 0 : value,
      },
    }));
  };

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title={`${dialog.type === "CREATE" ? "Tambah Topping" : "Edit Topping"}`}
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nama</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Masukan Nama"
            required
            onChange={onInputChange}
            value={dialog.data?.name ?? ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="Masukan Harga"
            required
            onChange={onInputChange}
            value={dialog.data?.price ?? ""}
          />
        </div>
      </div>
      <Button>Submit</Button>
    </DialogLayout>
  );
};

export default DialogMutation;
