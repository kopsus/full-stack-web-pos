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
import { dataPayment } from "@/data/payment";
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

  const onValueChange = (value: string, name: string) => {
    setDialog((prev) => ({
      ...prev,
      data: {
        ...prev.data!,
        [name]: value,
      },
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
          <Select
            onValueChange={(value) => onValueChange(value, "id")}
            value={dialog.data?.id ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Produk" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Produk</SelectLabel>
                {dataPayment.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
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
            onChange={onInputChange}
            value={dialog.data?.stock ?? ""}
          />
        </div>
      </div>
      <Button>Submit</Button>
    </DialogLayout>
  );
};

export default DialogMutation;
