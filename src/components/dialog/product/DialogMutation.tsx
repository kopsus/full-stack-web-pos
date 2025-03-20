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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, updateProduct } from "@/lib/actions/product";
import {
  productSchema,
  ProductSchema,
} from "@/lib/formValidationSchemas/product";
import { TypeCategory } from "@/types/category";
import { storeDialogProduct } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Upload } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface IDialogMutation {
  dataCategory: TypeCategory[];
}

const DialogMutation = ({ dataCategory }: IDialogMutation) => {
  const [dialog, setDialog] = useAtom(storeDialogProduct);
  const [imageProduct, setImageProduct] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, show: false }));
    setPreviewUrl(null);
    setImageProduct(null);
    form.reset({
      name: "",
      price: 0,
      quantity: 0,
      category_id: "",
      image: undefined,
    });
  };

  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      category_id: "",
      image: undefined,
    },
  });

  React.useEffect(() => {
    if (dialog.type === "UPDATE" && dialog.data) {
      const imageUrl = dialog.data.image;
      setPreviewUrl(imageUrl ? `/uploads/${imageUrl}` : null);
      form.reset({
        name: dialog.data.name,
        price: dialog.data.price,
        quantity: dialog.data.quantity,
        category_id: dialog.data.category_id,
        image: dialog.data.image,
      });
    }
  }, [dialog.type, dialog.data, form]);

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof productSchema>) {
    const formData = new FormData();
    if (imageProduct) {
      formData.append("image", imageProduct);
    }
    let result;
    if (dialog.type === "UPDATE" && dialog.data?.id) {
      result = await updateProduct(dialog.data.id, values, formData);
    } else {
      result = await createProduct(values, formData);
    }

    if (result.success.status) {
      toast.success(result.success.message);
      closeDialog();
    } else {
      toast.error(result.error.message);
    }
  }

  return (
    <DialogLayout
      show={dialog.type !== "DELETE" && dialog.show}
      onHide={closeDialog}
      title={`${dialog.type === "CREATE" ? "Tambah Produk" : "Edit Produk"}`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid gap-2">
            <div className="w-40 h-40 mx-auto rounded-xl border bg-white shadow-1 overflow-hidden">
              {previewUrl ? (
                <Image
                  src={previewUrl ? previewUrl : `/uploads/${previewUrl}`}
                  alt="Preview"
                  width={160}
                  height={160}
                />
              ) : null}
            </div>
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">
                    Foto
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        className="pl-12"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setImageProduct(file || null);
                          if (file) {
                            setPreviewUrl(URL.createObjectURL(file));
                          }
                        }}
                      />
                      <Upload className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dataCategory.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    placeholder="Masukkan nama produk"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="number"
                    placeholder="Masukkan harga"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="number"
                    placeholder="Masukkan quantity"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Form>
    </DialogLayout>
  );
};

export default DialogMutation;
