import { storeDialogPayment } from "@/api/payment/store";
import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAtom } from "jotai";
import React from "react";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogPayment);

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
        [name]: value,
      },
    }));
  };

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title={`${dialog.type === "CREATE" ? "Tambah Payment" : "Edit Payment"}`}
    >
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
      <Button>Submit</Button>
    </DialogLayout>
  );
};

export default DialogMutation;
