import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { formatIDR } from "@/lib/format";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FormCart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Rincian Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src="https://asset.kompas.com/crops/U6YxhTLF-vrjgM8PN3RYTHlIxfM=/84x60:882x592/1200x800/data/photo/2021/11/17/61949959e07d3.jpg"
                  alt="menu"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
              <div className="text-sm flex flex-col gap-3">
                <div>
                  <p className="line-clamp-1">Nasi Goreng</p>
                  <p>{formatIDR(12000)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MinusCircle className="cursor-pointer" />
                  <p>0</p>
                  <PlusCircle className="cursor-pointer" />
                </div>
              </div>
            </div>
            <Trash
              fill="red"
              color="red"
              size={16}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <p>Subtotal</p>
              <p className="font-semibold">{formatIDR(12000)}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p>Tax</p>
              <p className="font-semibold">10%</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p>Total</p>
              <p className="font-semibold text-red-600">{formatIDR(15000)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Masukan nama pembeli"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="date">Tanggal</Label>
              </div>
              <Input
                id="date"
                name="date"
                type="date"
                required
                className="block"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="payment">Metode Pembayaran</Label>
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Metode Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Metode Pembayaran</SelectLabel>
                    <SelectItem value="bri">BRI</SelectItem>
                    <SelectItem value="bca">BCA</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormCart;
