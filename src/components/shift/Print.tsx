"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { TypeTransaction } from "@/types/transaction";
import Receipt from "../_global/Receipt";
import { Button } from "../ui/button";

interface IPrint {
  history: TypeTransaction[];
}

const Print = ({ history }: IPrint) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <Button onClick={() => handlePrint()} size="lg">
        Print Receipt
      </Button>
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          <Receipt history={history} />
        </div>
      </div>
    </div>
  );
};

export default Print;
