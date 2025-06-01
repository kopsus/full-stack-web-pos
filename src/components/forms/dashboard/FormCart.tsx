import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Image from "next/image";
import { formatIDR } from "@/lib/format";
import {
  ChevronRight,
  MinusCircle,
  PlusCircle,
  Trash,
  XCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { TypeProduct } from "@/types/product";
import { TypePayment } from "@/types/payment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  transactionSchema,
  TransactionSchema,
} from "@/lib/formValidationSchemas/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransaction } from "@/lib/actions/transaction";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypeVoucher } from "@/types/voucher";
import { TypeTopping } from "@/types/topping";
import { EnumSalesType } from "@prisma/client";
import { baseIMAGEURL } from "@/lib/utils";

interface IFormCart {
  cartItems: TypeProduct[];
  updateQuantity: (id: string, amount: number) => void;
  dataPayment: TypePayment[];
  setCartItems: React.Dispatch<React.SetStateAction<TypeProduct[]>>;
  dataVoucher: TypeVoucher[];
  dataTopping: TypeTopping[];
  activeShift?: {
    id: string;
    start_time: Date;
  } | null;
}

const FormCart = ({
  cartItems,
  updateQuantity,
  dataPayment,
  setCartItems,
  dataVoucher,
  dataTopping,
  activeShift,
}: IFormCart) => {
  const [selectedVoucher, setSelectedVoucher] =
    React.useState<TypeVoucher | null>(null);
  const [selectedToppings, setSelectedToppings] = React.useState<TypeTopping[]>(
    []
  );
  const [paidAmount, setPaidAmount] = React.useState<number | 0>(0);

  // Hitung subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 0),
    0
  );
  const toppingSubtotal = selectedToppings.reduce((acc, topping) => {
    const toppingData = dataTopping.find((t) => t.id === topping.id);
    return toppingData
      ? acc + (topping.quantity || 0) * (toppingData.price || 0)
      : acc;
  }, 0);

  // Hitung total setelah diskon
  const subtotalBeforeTax = subtotal + toppingSubtotal;
  const discount = selectedVoucher
    ? (subtotalBeforeTax * selectedVoucher.discount) / 100
    : 0;
  const baseTotal = subtotalBeforeTax - discount;

  // Setup form dulu!
  const form = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      customer_name: "",
      sales_type: "DO",
      shift_id: activeShift?.id,
      payment_id: "",
      voucher_id: null,
      change: 0,
      paid_amount: 0,
      transaksi_product: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity || 1,
      })),
      transaksi_topping: selectedToppings.map((t) => ({
        topping_id: t.id,
        quantity: t.quantity,
      })),
      total_amount: 0,
    },
    mode: "onSubmit",
  });

  const selectedSalesType = form.watch("sales_type");

  // ⬇️ Setelah form dibuat, baru kita bisa pakai form.watch
  const selectedPayment = form.watch("payment_id");
  const selectedPaymentMethod = dataPayment.find(
    (item) => item.id === selectedPayment
  );

  // Hitung final total (dengan service fee)
  const gojekFee = selectedSalesType === "Gojek" ? baseTotal * 0.35 : 0;

  const finalTotal = baseTotal + gojekFee;

  // Hitung kembalian
  const changeAmount = paidAmount
    ? Math.max(Number(paidAmount) - finalTotal, 0)
    : 0;

  // Efek untuk memperbarui paid_amount berdasarkan metode pembayaran
  React.useEffect(() => {
    const lowerCaseName = selectedPaymentMethod?.name.toLowerCase();

    if (lowerCaseName === "cash") {
      form.setValue("paid_amount", paidAmount ? Number(paidAmount) : 0);
    } else {
      form.setValue("paid_amount", finalTotal);
    }
  }, [selectedPaymentMethod, paidAmount, finalTotal, form, selectedSalesType]);

  React.useEffect(() => {
    form.setValue("change", changeAmount);
  }, [changeAmount, form]);

  // Efek untuk memperbarui change
  React.useEffect(() => {
    const updatedChange =
      selectedPaymentMethod?.name.toLowerCase() === "cash"
        ? Math.max((paidAmount ? Number(paidAmount) : 0) - finalTotal, 0)
        : 0;
    form.setValue("change", updatedChange);
  }, [paidAmount, finalTotal, selectedPaymentMethod, form]);

  // Saat mengisi input paid amount
  const handlePaidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaidAmount(e.target.value ? Number(e.target.value) : 0);
  };

  React.useEffect(() => {
    form.setValue(
      "transaksi_product",
      cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity || 1,
      }))
    );
  }, [cartItems, form]);

  React.useEffect(() => {
    form.setValue("total_amount", finalTotal);
  }, [form, finalTotal]);

  const handleToppingChange = (toppingId: string, action: "add" | "remove") => {
    setSelectedToppings((prev) => {
      const existingTopping = prev.find((t) => t.id === toppingId);
      if (action === "add") {
        return existingTopping
          ? prev.map((t) =>
              t.id === toppingId ? { ...t, quantity: t.quantity! + 1 } : t
            )
          : [...prev, { id: toppingId, quantity: 1 }];
      } else {
        return existingTopping && existingTopping.quantity! > 1
          ? prev.map((t) =>
              t.id === toppingId ? { ...t, quantity: t.quantity! - 1 } : t
            )
          : prev.filter((t) => t.id !== toppingId);
      }
    });
  };

  React.useEffect(() => {
    form.setValue(
      "transaksi_topping",
      selectedToppings.map((item) => ({
        topping_id: item.id,
        quantity: item.quantity || 1,
      }))
    );
  }, [form, selectedToppings]);

  React.useEffect(() => {
    form.setValue("voucher_id", selectedVoucher ? selectedVoucher.id : null);
  }, [selectedVoucher, form]);

  const isSubmitting = form.formState.isSubmitting;

  // Fungsi untuk reset seluruh state dan form
  const resetTransactionForm = () => {
    form.reset({
      customer_name: "",
      sales_type: "DO",
      shift_id: activeShift?.id || "",
      payment_id: "",
      voucher_id: null,
      transaksi_product: [],
      transaksi_topping: [],
      total_amount: 0,
      change: 0,
      paid_amount: 0,
    });

    setCartItems([]); // Jika Anda pakai state cartItems
    setSelectedVoucher(null);
    setSelectedToppings([]);
    setPaidAmount(0);
  };

  async function onSubmit() {
    const values = form.getValues();

    try {
      const result = await createTransaction(values);

      if (result.success.status) {
        toast.success(result.success.message);

        // Kirim ke printer
        await fetch("http://localhost:1818/print/transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data.transaksi),
        });

        resetTransactionForm(); // Reset form dan semua state
      } else if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
      toast.error("Gagal menyimpan transaksi");
    }
  }

  const now = new Date(); // Ambil waktu saat ini

  const validVouchers = dataVoucher.filter(
    (voucher) => new Date(voucher.voucher_end) > now
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Rincian Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border">
                      <Image
                        src={`${baseIMAGEURL}/${item.image}`}
                        alt={item.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    </div>
                    <div className="text-sm flex flex-col justify-between gap-1">
                      <p className="line-clamp-1 font-bold">{item.name}</p>
                      <p className="text-xs">
                        {formatIDR(item.price * (item.quantity || 1))}
                      </p>
                      <div className="flex items-center gap-2">
                        <MinusCircle
                          className="cursor-pointer size-5"
                          onClick={() => updateQuantity(item.id, -1)}
                        />
                        <p>{item.quantity}</p>
                        <PlusCircle
                          className="cursor-pointer size-5"
                          onClick={() => updateQuantity(item.id, 1)}
                        />
                      </div>
                    </div>
                  </div>
                  <Trash
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, -item.quantity!)}
                    color="red"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {/* topping */}
              <div className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger
                    disabled={subtotal === 0}
                    className="text-sm p-2 cursor-pointer flex items-center justify-between rounded-lg border"
                  >
                    Tambah Topping
                    <ChevronRight />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Pilih Topping</DialogTitle>
                    <div className="grid grid-cols-2 gap-4">
                      {dataTopping.map((topping) => {
                        const selected = selectedToppings.find(
                          (t) => t.id === topping.id
                        );
                        return (
                          <Card
                            key={topping.id}
                            className="p-4 text-sm rounded-lg border shadow-md"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-semibold">{topping.name}</p>
                                <p className="text-gray-500">
                                  {formatIDR(topping.price!)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <MinusCircle
                                  className={`cursor-pointer ${
                                    selected ? "text-black" : "text-gray-300"
                                  }`}
                                  onClick={() =>
                                    handleToppingChange(topping.id, "remove")
                                  }
                                />
                                <p>{selected ? selected.quantity : 0}</p>
                                <PlusCircle
                                  className="cursor-pointer text-black"
                                  onClick={() =>
                                    handleToppingChange(topping.id, "add")
                                  }
                                />
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </DialogContent>
                </Dialog>
                {selectedToppings.length > 0 && (
                  <div className="p-2 border rounded-lg">
                    <h3 className="text-sm font-semibold">
                      Topping yang Dipilih:
                    </h3>
                    <ul className="mt-2">
                      {selectedToppings.map((topping) => {
                        const toppingData = dataTopping.find(
                          (t) => t.id === topping.id
                        );
                        return (
                          <li
                            key={topping.id}
                            className="flex justify-between text-sm border-b py-2"
                          >
                            <span>
                              {toppingData?.name} x {topping.quantity}
                            </span>
                            <span>
                              {formatIDR(
                                toppingData?.price! * topping.quantity!
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              {/* voucher */}
              <div className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger
                    disabled={subtotal === 0}
                    className="text-sm p-2 cursor-pointer flex items-center justify-between rounded-lg border"
                  >
                    {selectedVoucher
                      ? `Voucher: ${selectedVoucher.name}`
                      : "Pilih Voucher"}
                    <ChevronRight />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Pilih Voucher</DialogTitle>
                    <div className="space-y-4">
                      {validVouchers.map((voucher) => {
                        const isValid = subtotal >= voucher.minimum_price;
                        const isSelected = selectedVoucher?.id === voucher.id;

                        return (
                          <Card
                            key={voucher.id}
                            onClick={() =>
                              isValid && setSelectedVoucher(voucher)
                            }
                            className={`p-4 text-sm rounded-lg cursor-pointer transition-all border-2 
                        ${
                          isValid
                            ? "hover:border-green-500 hover:bg-green-100"
                            : "opacity-50 cursor-not-allowed"
                        } 
                        ${
                          isSelected
                            ? "border-green-500 bg-green-100"
                            : "border-gray-200"
                        }`}
                          >
                            <p className="font-medium">Nama: {voucher.name}</p>
                            <p>Diskon: {voucher.discount}%</p>
                            <p>
                              Min. Belanja: {formatIDR(voucher.minimum_price)}
                            </p>
                          </Card>
                        );
                      })}
                    </div>
                  </DialogContent>
                </Dialog>
                {selectedVoucher && (
                  <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg border border-green-500 text-xs font-bold">
                    <p>
                      Voucher {selectedVoucher.name} -{" "}
                      {selectedVoucher.discount}%
                    </p>
                    <XCircle
                      className="cursor-pointer text-red-500"
                      onClick={() => setSelectedVoucher(null)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <p>Subtotal Produk</p>
                <p className="font-semibold">{formatIDR(subtotal)}</p>
              </div>
              {selectedToppings.length > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <p>Subtotal Topping</p>
                  <p className="font-semibold">{formatIDR(toppingSubtotal)}</p>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <p>Total</p>
                <p className="font-semibold text-red-600">
                  {formatIDR(finalTotal)}
                </p>
              </div>
            </div>

            {/* data customer */}
            <div className="flex flex-col gap-2">
              {/* Customer Name */}
              <FormField
                control={form.control}
                name="customer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Masukan nama pembeli" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sales Type */}
              <FormField
                control={form.control}
                name="sales_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Penjualan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Tipe Penjualan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(EnumSalesType).map((salesType) => (
                          <SelectItem key={salesType} value={salesType}>
                            {salesType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Payment Method */}
              <FormField
                control={form.control}
                name="payment_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metode Pembayaran</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Metode Pembayaran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dataPayment.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedPaymentMethod?.name.toLowerCase() === "cash" && (
                <>
                  <FormField
                    control={form.control}
                    name="paid_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Dibayar</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={paidAmount}
                            type="number"
                            placeholder="Masukkan jumlah yang dibayar"
                            onChange={handlePaidAmountChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Tampilkan Total Kembalian */}
                  <div className="text-lg font-semibold">
                    Kembalian: {formatIDR(form.watch("change"))}
                  </div>
                </>
              )}
            </div>

            {activeShift ? (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Simpan"}
              </Button>
            ) : (
              <p className="text-red-500 text-sm mb-2">
                Anda belum memulai shift. Silakan mulai shift terlebih dahulu!
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormCart;
