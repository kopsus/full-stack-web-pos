import { storeDialogStock } from "@/api/stock/store";
import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import React from "react";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogStock);
  const closeDialog = () => {
    setDialog((prev) => ({
      ...prev,
      show: false,
    }));
  };

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title={`${dialog.type === "CREATE" ? "Tambah Stock" : "Edit Stock"}`}
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="payment">Produk</Label>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Produk" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Produk</SelectLabel>
                <SelectItem value="bri">BRI</SelectItem>
                <SelectItem value="bca">BCA</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="name">Stock</Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            placeholder="Masukan Stock"
            required
          />
        </div>
      </div>
      <Button>Submit</Button>
    </DialogLayout>
  );
};

export default DialogMutation;
