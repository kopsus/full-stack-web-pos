import { DataTable } from "@/components/tables/history/DataTable";
import { ColumnsHistory } from "@/components/tables/history/Columns";
import PageHeader from "@/components/page-header";
import { dataHistory } from "@/data/history";
import React from "react";

const page = () => {
  return (
    <>
      <PageHeader title="History" />
      <DataTable title="History" data={dataHistory} columns={ColumnsHistory} />
    </>
  );
};

export default page;
