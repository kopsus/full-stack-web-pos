"use client";

import { storeDialogUser } from "@/api/user/store";
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
import { dataRole } from "@/data/user";
import { useAtom } from "jotai";
import React from "react";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogUser);

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
      title={`${dialog.type === "CREATE" ? "Tambah User" : "Edit User"}`}
    >
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Masukan Email"
            required
            onChange={onInputChange}
            value={dialog.data?.email ?? ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <Select
            onValueChange={(value) => onValueChange(value, "roleId")}
            value={dialog.data?.roleId ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                {dataRole.map((item) => (
                  <SelectItem key={item.id} value={item?.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Masukan Password"
            required
            onChange={onInputChange}
            value={dialog.data?.password ?? ""}
          />
        </div>
      </div>
      <Button>Submit</Button>
    </DialogLayout>
  );
};

export default DialogMutation;
