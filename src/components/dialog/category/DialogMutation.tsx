"use client";

import DialogLayout from "@/components/_global/DialogLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory, updateCategory } from "@/lib/actions/category";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategorySchema,
  categorySchema,
} from "@/lib/formValidationSchemas/category";
import { useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { storeDialogCategory } from "@/types/category";

const DialogMutation = () => {
  const [dialog, setDialog] = useAtom(storeDialogCategory);

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, show: false, data: null }));
  };

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
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

  async function onSubmit(values: CategorySchema) {
    try {
      let result;
      if (dialog.type === "UPDATE" && dialog.data?.id) {
        result = await updateCategory({ id: dialog.data.id, ...values });
      } else {
        result = await createCategory(values);
      }

      if (result.success) {
        alert(result.success.message);
        closeDialog();
      } else {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    }
  }

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title={`${
        dialog.type === "CREATE" ? "Tambah Category" : "Edit Category"
      }`}
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
                  Nama Category
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Masukan nama category" />
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
