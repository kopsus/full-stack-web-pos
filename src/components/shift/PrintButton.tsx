"use client";
import { useState } from "react";
import { Button } from "../ui/button";

const PrintButton = ({ history }: { history: any[] }) => {
  const [loading, setLoading] = useState(false);

  const handlePrint = async () => {
    setLoading(true);
    const response = await fetch("/api/print", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history }),
    });

    setLoading(false);
    if (!response.ok) {
      alert("Gagal mencetak!");
    }
  };

  return (
    <Button onClick={handlePrint} disabled={loading} size={"lg"}>
      {loading ? "Mencetak..." : "Print Tanpa Dialog"}
    </Button>
  );
};

export default PrintButton;
