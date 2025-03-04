import { X } from "lucide-react";
import { ReactNode } from "react";

interface DialogLayoutProps {
  show: boolean;
  onHide: () => void;
  title?: string;
  desc?: string;
  titleDelete?: string;
  children: ReactNode;
}

const DialogLayout = ({
  children,
  title,
  desc,
  titleDelete,
  show,
  onHide,
}: DialogLayoutProps) => {
  return (
    <>
      {/* Overlay untuk menutupi seluruh body aplikasi */}
      {show && (
        <div
          className="fixed inset-0 z-50 bg-black/80 pointer-events-auto"
          onClick={onHide}
        />
      )}

      <div
        className={`${
          show ? "pointer-events-auto block" : "hidden pointer-events-none"
        } fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-10 border border-zinc-200 bg-white p-6 shadow-lg duration-200 rounded-xl max-h-screen overflow-y-auto max-w-[425px]`}
      >
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </p>
          <p className="text-lg font-semibold leading-none tracking-tight text-center">
            {titleDelete}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{desc}</p>
        </div>
        <X
          color="red"
          onClick={onHide}
          className="w-4 h-4 cursor-pointer absolute right-4 top-4 hover:scale-105 transition-all"
        />

        {children}
      </div>
    </>
  );
};

export default DialogLayout;
