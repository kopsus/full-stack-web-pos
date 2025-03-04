import CardMenu from "@/components/_global/CardMenu";
import CardState from "@/components/_global/CardState";
import FormCart from "@/components/dashboard/FormCart";
import PageHeader from "@/components/page-header";
import { dataProduct } from "@/data/product";
import React from "react";

const page = () => {
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="p-4 grid lg:grid-cols-3 gap-5">
        <div className="col-span-2 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:items-center gap-4">
            <CardState />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {dataProduct.map((item, index) => (
              <CardMenu key={index} {...item} />
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <FormCart />
        </div>
      </div>
    </>
  );
};

export default page;
