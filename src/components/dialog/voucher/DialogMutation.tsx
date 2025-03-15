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
import { createVoucher, updateVoucher } from "@/lib/actions/voucher";
import {
  voucherSchema,
  VoucherSchema,
} from "@/lib/formValidationSchemas/voucher";
import { storeDialogVoucher } from "@/types/voucher";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogVoucher);

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, show: false, data: null }));
  };

  const form = useForm<VoucherSchema>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      discount: 0,
      // percentage: 0,
      // max_usage: 0,
      // minimum_price: 0,
      // maximum_price: 0,
      // voucher_end: null,
    },
  });

  React.useEffect(() => {
    if (dialog.type === "CREATE") {
      form.reset({
        discount: 0,
        // percentage: 0,
        // max_usage: 0,
        // minimum_price: 0,
        // maximum_price: 0,
        // voucher_end: null,
      });
    } else if (dialog.type === "UPDATE" && dialog.data) {
      form.reset({
        discount: dialog.data.discount,
        // percentage: dialog.data.percentage,
        // minimum_price: dialog.data.minimum_price,
        // maximum_price: dialog.data.maximum_price,
        // max_usage: dialog.data.max_usage,
        // voucher_end: dialog.data.voucher_end,
      });
    }
  }, [dialog.type, dialog.data, form]);

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: VoucherSchema) {
    try {
      let result;
      if (dialog.type === "UPDATE" && dialog.data?.id) {
        result = await updateVoucher({ id: dialog.data.id, ...values });
      } else {
        result = await createVoucher(values);
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
      title={`${dialog.type === "CREATE" ? "Tambah Voucher" : "Edit Voucher"}`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col"
        >
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah Discount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    placeholder="Masukan Jumlah Discount"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percentage</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    required
                    placeholder="Masukan percentage"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minimum_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="number"
                    placeholder="Masukan Minimum Price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maximum_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="number"
                    placeholder="Masukan Maximum Price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_usage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maksimal Digunakan</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="number"
                    placeholder="Masukan max usage"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="voucher_end"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Berakhir Voucher
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={dayjs(field.value).format("YYYY-MM-DD")}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Form>
    </DialogLayout>
  );
};

export default DialogMutation;
