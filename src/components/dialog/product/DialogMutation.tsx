"use client";

import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useImagePreview from "@/hooks/useImagePreview";
import { storeDialogProduct } from "@/types/product";
import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogProduct);
  const { previewUrl, setPreviewUrl, handleImageChange } = useImagePreview();

  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
    setPreviewUrl("");
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
      title={`${dialog.type === "CREATE" ? "Tambah Product" : "Edit Product"}`}
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <div className="w-40 h-40 mx-auto rounded-xl border bg-white shadow-1 overflow-hidden">
            {previewUrl || dialog.data?.image ? (
              <Image
                src={previewUrl || dialog.data?.image || ""}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
              />
            ) : null}
          </div>
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            name="image"
            onChange={(e) => {
              handleImageChange(e);
            }}
          />
        </div>
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
