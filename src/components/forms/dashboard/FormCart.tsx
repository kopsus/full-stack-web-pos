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
import { TypeUser } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypeVoucher } from "@/types/voucher";
import { TypeTopping } from "@/types/topping";

interface IFormCart {
  cartItems: TypeProduct[];
  updateQuantity: (id: string, amount: number) => void;
  dataPayment: TypePayment[];
  setCartItems: React.Dispatch<React.SetStateAction<TypeProduct[]>>;
  dataUser: TypeUser;
  dataVoucher: TypeVoucher[];
  dataTopping: TypeTopping[];
}

const FormCart = ({
  cartItems,
  updateQuantity,
  dataPayment,
  setCartItems,
  dataUser,
  dataVoucher,
  dataTopping,
}: IFormCart) => {
  const [selectedVoucher, setSelectedVoucher] =
    React.useState<TypeVoucher | null>(null);
  const [selectedTopping, setSelectedTopping] =
    React.useState<TypeTopping | null>(null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 0),
    0
  );
  const discount = selectedVoucher
    ? (subtotal * selectedVoucher.discount) / 100
    : 0;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + tax;

  // Setup form
  const form = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      customer_name: "",
      sales_type: "DO",
      user_id: dataUser.id,
      payment_id: "",
      voucher_id: null,
      transaksi_product: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity || 1,
      })),
      total_amount: total,
    },
    mode: "onSubmit",
  });

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
    form.setValue("total_amount", total);
  }, [form, total]);

  React.useEffect(() => {
    form.setValue("voucher_id", selectedVoucher ? selectedVoucher.id : null);
  }, [selectedVoucher, form]);

  const isSubmitting = form.formState.isSubmitting;

  const clearCart = () => {
    setCartItems([]);
    setSelectedVoucher(null);
    setSelectedTopping(null);
  };

  async function onSubmit() {
    const values = form.getValues();
    console.log("Payload Transaksi:", values);

    try {
      const result = await createTransaction(values);

      if (result.success.status) {
        toast.success(result.success.message);

        // Reset form
        form.reset({
          customer_name: "",
          sales_type: "DO",
          user_id: "cm872bpwk0000wxpkjbi702mw",
          payment_id: "",
          voucher_id: "",
          transaksi_product: [],
          total_amount: 0,
        });

        clearCart();
      } else if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error saat membuat transaksi:", error);
    }
  }

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
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    </div>
                    <div className="text-sm flex flex-col gap-3">
                      <p className="line-clamp-1 font-bold">{item.name}</p>
                      <p>{formatIDR(item.price * (item.quantity || 1))}</p>
                      <div className="flex items-center gap-2">
                        <MinusCircle
                          className="cursor-pointer"
                          onClick={() => updateQuantity(item.id, -1)}
                        />
                        <p>{item.quantity}</p>
                        <PlusCircle
                          className="cursor-pointer"
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
                  {dataVoucher.map((voucher) => {
                    const isValid = subtotal >= voucher.minimum_price;
                    const isSelected = selectedVoucher?.id === voucher.id;

                    return (
                      <Card
                        key={voucher.id}
                        onClick={() => isValid && setSelectedVoucher(voucher)}
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
                        <p>Min. Belanja: {voucher.minimum_price}</p>
                      </Card>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>

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
                    {dataVoucher.map((voucher) => {
                      const isValid = subtotal >= voucher.minimum_price;
                      const isSelected = selectedVoucher?.id === voucher.id;

                      return (
                        <Card
                          key={voucher.id}
                          onClick={() => isValid && setSelectedVoucher(voucher)}
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
                          <p>Min. Belanja: {voucher.minimum_price}</p>
                        </Card>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
              {selectedVoucher && (
                <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg border border-green-500 text-xs font-bold">
                  <p>
                    Voucher {selectedVoucher.name} - {selectedVoucher.discount}%
                  </p>
                  <XCircle
                    className="cursor-pointer text-red-500"
                    onClick={() => setSelectedVoucher(null)}
                  />
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <p>Subtotal</p>
                <p className="font-semibold">{formatIDR(subtotal)}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p>Tax (10%)</p>
                <p className="font-semibold">{formatIDR(tax)}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p>Total</p>
                <p className="font-semibold text-red-600">{formatIDR(total)}</p>
              </div>
            </div>

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
                        <SelectItem value="DO">DO</SelectItem>
                        <SelectItem value="DineIn">Dine In</SelectItem>
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
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Simpan"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormCart;
