"use client";

import React from "react";
import { TypeProduct } from "@/types/product";
import CardMenu from "@/components/_global/CardMenu";
import CardState from "@/components/_global/CardState";
import FormCart from "@/components/forms/dashboard/FormCart";
import { TypePayment } from "@/types/payment";

interface IDashboard {
  dataProduct: TypeProduct[];
  dataPayment: TypePayment[];
}

const Dashboard = ({ dataProduct, dataPayment }: IDashboard) => {
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

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:items-center gap-4">
          <CardState />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {dataProduct.map((item, index) => (
            <CardMenu key={index} {...item} addToCart={addToCart} />
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <FormCart
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          dataPayment={dataPayment}
          setCartItems={setCartItems}
        />
      </div>
    </div>
  );
};

export default Dashboard;
