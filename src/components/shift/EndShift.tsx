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

type PrintType = "thermal" | "non-thermal";

const EndShift = ({ history, activeShift }: IEndShift) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handleEndShift = async (type: PrintType) => {
    setIsPrinting(true);
    try {
      await endShift({ id: activeShift.id });

      // const updatedShift = {
      //   ...activeShift,
      //   end_time: new Date(), // karena kamu tahu waktu end-nya adalah sekarang
      // };

      // const filteredHistory = filterTransactionsByShift(history, updatedShift);

      // const response = await fetch("/api/print", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     history: filteredHistory,
      //     shift: updatedShift,
      //     type,
      //   }),
      // });

      // const result = await response.json();
      // if (!result.success) {
      //   alert(`Gagal mencetak: ${result.message}`);
      // } else {
      //   alert("Struk berhasil dicetak ke printer thermal!");
      // }

      await logout();
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
        onClick={() => handleEndShift("non-thermal")}
        disabled={isPrinting}
      >
        {isPrinting ? "Mencetak..." : "Akhiri Shift"}
      </Button>
      {/* <Button
        size={"lg"}
        variant={"destructive"}
        onClick={() => handleEndShift("thermal")}
        disabled={isPrinting}
      >
        {isPrinting ? "Mencetak..." : "Print Non Thermal"}
      </Button> */}
    </div>
  );
};

export default EndShift;
