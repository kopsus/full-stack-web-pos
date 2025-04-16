"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TypeTransaksi } from "@/types/transaction";

const PrintButton = ({ history }: { history: TypeTransaksi[] }) => {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      const response = await fetch("/api/print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history }),
      });

      const result = await response.json();
      if (!result.success) {
        alert(`Gagal mencetak: ${result.message}`);
      } else {
        alert("Struk berhasil dicetak!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat mencetak");
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <Button onClick={handlePrint} disabled={isPrinting}>
      {isPrinting ? "Mencetak..." : "Print Receipt"}
    </Button>
  );
};

export default PrintButton;
