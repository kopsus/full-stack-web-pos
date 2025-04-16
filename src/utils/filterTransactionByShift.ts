import { TypeTransaksi } from "@/types/transaction";

interface Shift {
  id: string;
  user: {
    id: string;
    name?: string;
  };
  start_time: Date;
  end_time?: Date;
}

export function filterTransactionsByShift(
  history: TypeTransaksi[],
  shift: Shift
): TypeTransaksi[] {
  const start = new Date(shift.start_time).getTime();
  const end = shift.end_time ? new Date(shift.end_time).getTime() : Date.now();

  return history.filter((trx) => {
    const trxTime = new Date(trx.createdAt).getTime();
    return (
      trx.shift?.id === shift.id &&
      trx.shift?.user?.id === shift.user.id &&
      trxTime >= start &&
      trxTime <= end
    );
  });
}
