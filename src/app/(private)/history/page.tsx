"use client";

import { DataTable } from "@/components/history/table/DataTable";
import { ColumnsHistory } from "@/components/history/table/Columns";
import PageHeader from "@/components/page-header";
import { dataHistory } from "@/data/history";
import React from "react";

const History = () => {
  return (
    <>
      <PageHeader title="History" />
      <DataTable title="History" data={dataHistory} columns={ColumnsHistory} />
    </>
  );
};

export default History;
