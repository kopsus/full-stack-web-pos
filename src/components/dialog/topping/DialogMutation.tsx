"use client";

import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTopping, updateTopping } from "@/lib/actions/topping";
import {
  toppingSchema,
  ToppingSchema,
} from "@/lib/formValidationSchemas/topping";
import { storeDialogTopping } from "@/types/topping";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogTopping);

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, show: false, data: null }));
  };

  const form = useForm<ToppingSchema>({
    resolver: zodResolver(toppingSchema),
    defaultValues: { name: "", price: 0 },
  });

  React.useEffect(() => {
    if (dialog.type === "CREATE") {
      form.reset({ name: "", price: 0 });
    } else if (dialog.type === "UPDATE" && dialog.data) {
      form.reset({
        name: dialog.data.name,
        price: dialog.data.price,
      });
    }
  }, [dialog.type, dialog.data, form]);

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: ToppingSchema) {
    try {
      let result;
      if (dialog.type === "UPDATE" && dialog.data?.id) {
        result = await updateTopping({ id: dialog.data.id, ...values });
      } else {
        result = await createTopping(values);
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
      title={`${dialog.type === "CREATE" ? "Tambah Topping" : "Edit Topping"}`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Topping</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    placeholder="Masukan nama Topping"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Topping</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="number"
                    placeholder="Masukan harga Topping"
                  />
                </FormControl>
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
