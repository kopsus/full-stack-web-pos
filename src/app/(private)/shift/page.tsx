import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <>
      <PageHeader title="Shift" />
      <Card className="m-4 p-5 h-full flex justify-center items-center gap-10">
        <Button size={"lg"} variant={"destructive"}>
          Akhiri Shift
        </Button>
        <Button size={"lg"}>Print Riwayat</Button>
      </Card>
    </>
  );
};

export default page;
