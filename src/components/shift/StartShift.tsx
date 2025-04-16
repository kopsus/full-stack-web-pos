"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { TypeUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { onShift } from "@/lib/actions/shift";
import { toast } from "react-toastify";

interface IStartShift {
  user?: TypeUser;
  activeShift?: {
    id: string;
    start_time: Date;
  } | null;
}

const StartShift = ({ user, activeShift }: IStartShift) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStartShift = () => {
    startTransition(() => {
      onShift({
        user_id: user?.id ?? "",
        start_time: new Date(),
      }).then((res) => {
        if (res?.success.status) {
          toast.success(res.success.message);
          router.refresh();
        } else {
          toast.error(res?.error.message || "Gagal memulai shift");
        }
      });
    });
  };

  if (activeShift) {
    return (
      <div className="text-green-600 font-semibold">
        Shift aktif dimulai pada{" "}
        {new Date(activeShift.start_time).toLocaleString()}
      </div>
    );
  }

  return (
    <Button size="lg" disabled={isPending} onClick={handleStartShift}>
      {isPending ? "Memulai..." : "Mulai Shift"}
    </Button>
  );
};

export default StartShift;
