import { TypeTransaksi } from "./transaction";
import { TypeUser } from "./user";

export type TypeShift = {
  id: string;
  user_id: string;
  user: TypeUser;
  start_time: Date;
  end_time: Date | null;
  transaksi?: TypeTransaksi[];
  createdAt: Date;
  updatedAt: Date;
};
