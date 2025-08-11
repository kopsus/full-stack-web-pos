"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { storeDialogVoucher, TypeVoucher } from "@/types/voucher";
import { TypeUser } from "@/types/user";
import { useEffect, useState } from "react";
import { profile } from "@/lib/actions/user";

interface ITableRowActions {
  item: TypeVoucher;
}

export function TableAction({ item }: ITableRowActions) {
  const setDialog = useSetAtom(storeDialogVoucher);
  const [user, setUser] = useState<TypeUser | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = await profile();
      setUser(userData);
    };

    fetchUserProfile();
  }, []);

  const handleDelete = () => {
    setDialog({
      type: "DELETE",
      show: true,
      data: item,
    });
  };

  const handleEdit = () => {
    setDialog({
      type: "UPDATE",
      show: true,
      data: item,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="rounded bg-transparent hover:bg-slate-50 flex h-8 w-8 p-0"
          >
            <MoreHorizontal />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit}>
          Edit
          <DropdownMenuShortcut>
            <Edit size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        {user?.role === "admin" && (
          <DropdownMenuItem onClick={handleDelete}>
            Delete
            <DropdownMenuShortcut>
              <Trash size={16} color="red" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
