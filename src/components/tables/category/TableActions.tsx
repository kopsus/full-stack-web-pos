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
import { storeDialogCategory } from "@/api/category/store";
import { useSetAtom } from "jotai";
import { TypeCategory } from "@/types/category";

interface ITableRowActions {
  item: TypeCategory;
}

export function TableAction({ item }: ITableRowActions) {
  const setDialog = useSetAtom(storeDialogCategory);

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
        <DropdownMenuItem onClick={handleDelete}>
          Delete
          <DropdownMenuShortcut>
            <Trash size={16} color="red" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
