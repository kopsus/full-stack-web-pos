"use client";

import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { createUser, updateUser } from "@/lib/actions/user";
import { userSchema, UserSchema } from "@/lib/formValidationSchemas/user";
import { storeDialogUser } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogUser);

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, show: false, data: null }));
  };

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: { username: "", password: "" },
  });

  React.useEffect(() => {
    if (dialog.type === "CREATE") {
      form.reset({ username: "", password: "" });
    } else if (dialog.type === "UPDATE" && dialog.data) {
      form.reset({
        username: dialog.data.username,
        role: dialog.data.role,
      });
    }
  }, [dialog.type, dialog.data, form]);

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: UserSchema) {
    try {
      let result;
      if (dialog.type === "UPDATE" && dialog.data?.id) {
        result = await updateUser({ id: dialog.data.id, ...values });
      } else {
        result = await createUser(values);
      }

      if (result.success.status) {
        toast.success(result.success.message);
        closeDialog();
      } else {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan");
    }
  }

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title={`${dialog.type === "CREATE" ? "Tambah User" : "Edit User"}`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col"
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cashier">Kasir</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    placeholder="Masukan nama voucher"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required={dialog.type === "CREATE"}
                    placeholder="Masukan Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Form>
    </DialogLayout>
  );
};

export default DialogMutation;
