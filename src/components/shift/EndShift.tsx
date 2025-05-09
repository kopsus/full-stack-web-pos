"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import logout from "@/lib/actions/logout";
import { TypeTransaksi } from "@/types/transaction";
import { endShift } from "@/lib/actions/shift";
import { filterTransactionsByShift } from "@/utils/filterTransactionByShift";

interface IEndShift {
  activeShift: any;
  history: TypeTransaksi[];
}

const EndShift = ({ history, activeShift }: IEndShift) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handleEndShift = async () => {
    setIsPrinting(true);
    try {
      await endShift({ id: activeShift.id });

      const updatedShift = {
        ...activeShift,
        end_time: new Date(), // karena kamu tahu waktu end-nya adalah sekarang
      };

      const filteredHistory = filterTransactionsByShift(history, updatedShift);

      await fetch("http://localhost:1818/print/shift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredHistory),
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mencetak");
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <Button
        size={"lg"}
        variant={"destructive"}
        onClick={() => handleEndShift()}
        disabled={isPrinting}
      >
        {isPrinting ? "Mencetak..." : "Akhiri Shift"}
      </Button>
    </div>
  );
};

export default EndShift;
