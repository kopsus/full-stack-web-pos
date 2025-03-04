import { storeDialogVoucher } from "@/api/voucher/store";
import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import React from "react";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogVoucher);
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
      title={`${dialog.type === "CREATE" ? "Tambah Voucher" : "Edit Voucher"}`}
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nama Voucher</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Masukan Nama Voucher"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="percentage">Percentage</Label>
          <Input
            id="percentage"
            name="percentage"
            type="number"
            placeholder="Masukan Percentage"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="minimum_price">Minimum Price</Label>
          <Input
            id="minimum_price"
            name="minimum_price"
            type="number"
            placeholder="Masukan Minimum Price"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="maximum_price">Maximum Price</Label>
          <Input
            id="maximum_price"
            name="maximum_price"
            type="number"
            placeholder="Masukan Maximum Price"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="max_usage">Max Usage</Label>
          <Input
            id="max_usage"
            name="max_usage"
            type="number"
            placeholder="Masukan Max Usage"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="end_date">Voucher End</Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            placeholder="Masukan Voucher End"
            required
            className="block"
          />
        </div>
      </div>
      <Button>Submit</Button>
    </DialogLayout>
  );
};

export default DialogMutation;
