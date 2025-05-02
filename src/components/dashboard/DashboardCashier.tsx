"use client";

import React from "react";
import { TypeProduct } from "@/types/product";
import CardMenu from "@/components/_global/CardMenu";
import CardState from "@/components/_global/CardState";
import FormCart from "@/components/forms/dashboard/FormCart";
import { TypePayment } from "@/types/payment";
import { TypeVoucher } from "@/types/voucher";
import { TypeTopping } from "@/types/topping";
import { Card } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TypeCategory } from "@/types/category";
import { TypeTransaksi } from "@/types/transaction";

interface IDashboard {
  dataProduct: TypeProduct[];
  dataPayment: TypePayment[];
  dataTransaction: TypeTransaksi[];
  dataVoucher: TypeVoucher[];
  dataTopping: TypeTopping[];
  dataCategory: TypeCategory[];
  activeShift?: {
    id: string;
    start_time: Date;
  } | null;
}

const Dashboard = ({
  dataProduct,
  dataPayment,
  dataTransaction,
  dataVoucher,
  dataTopping,
  dataCategory,
  activeShift,
}: IDashboard) => {
  const [cartItems, setCartItems] = React.useState<TypeProduct[]>([]);

  const addToCart = (product: TypeProduct) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 0) + amount }
            : item
        )
        .filter((item) => (item.quantity || 0) > 0)
    );
  };

  const [activeTab, setActiveTab] = React.useState(dataCategory[0].id);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const filteredProducts = dataProduct.filter(
    (item) => item.category_id === activeTab
  );

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:items-center gap-4">
          <CardState
            dataTransaction={dataTransaction}
            dataProduct={dataProduct}
            activeShift={activeShift}
          />
        </div>
        <Card className="p-4 space-y-4">
          <Tabs
            defaultValue={dataCategory[0].id}
            onValueChange={handleTabChange}
            className="space-y-4"
          >
            <TabsList>
              {dataCategory.map((item) => (
                <TabsTrigger key={item.id} value={item.id}>
                  {item.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2 2xl:gap-4">
            {filteredProducts.map((item, index) => (
              <CardMenu key={index} {...item} addToCart={addToCart} />
            ))}
          </div>
        </Card>
      </div>
      <div className="col-span-1">
        <FormCart
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          dataPayment={dataPayment}
          setCartItems={setCartItems}
          dataVoucher={dataVoucher}
          dataTopping={dataTopping}
          activeShift={activeShift}
        />
      </div>
    </div>
  );
};

export default Dashboard;
