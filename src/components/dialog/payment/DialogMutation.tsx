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
import { createPayment, updatePayment } from "@/lib/actions/payment";
import {
  paymentSchema,
  PaymentSchema,
} from "@/lib/formValidationSchemas/payment";
import { storeDialogPayment } from "@/types/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogPayment);

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, show: false, data: null }));
  };

  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { name: "" },
  });

  React.useEffect(() => {
    if (dialog.type === "CREATE") {
      form.reset({ name: "" });
    } else if (dialog.type === "UPDATE" && dialog.data) {
      form.reset({
        name: dialog.data.name,
      });
    }
  }, [dialog.type, dialog.data, form]);

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: PaymentSchema) {
    try {
      let result;
      if (dialog.type === "UPDATE" && dialog.data?.id) {
        result = await updatePayment({ id: dialog.data.id, ...values });
      } else {
        result = await createPayment(values);
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
      title={`${dialog.type === "CREATE" ? "Tambah Payment" : "Edit Payment"}`}
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
                <FormLabel className="text-gray-700 text-left">
                  Nama Payment
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    placeholder="Masukan nama payment"
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
