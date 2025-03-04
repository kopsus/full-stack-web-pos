import { TypeVoucher } from "@/api/voucher/types";

export const dataVoucher: TypeVoucher[] = [
  {
    id: "1",
    name: "ramadhan",
    percentage: 20,
    minimum_price: 300000,
    maximum_price: 1000000,
    end_date: "2025-02-24",
    max_usage: 5,
  },
  {
    id: "2",
    name: "newYear",
    percentage: 15,
    minimum_price: 200000,
    maximum_price: 500000,
    end_date: "2025-01-01",
    max_usage: 10,
  },
  {
    id: "3",
    name: "christmas",
    percentage: 25,
    minimum_price: 400000,
    maximum_price: 1500000,
    end_date: "2025-12-25",
    max_usage: 8,
  },
  {
    id: "4",
    name: "blackFriday",
    percentage: 50,
    minimum_price: 100000,
    maximum_price: 2000000,
    end_date: "2025-11-30",
    max_usage: 20,
  },
  {
    id: "5",
    name: "summerSale",
    percentage: 30,
    minimum_price: 500000,
    maximum_price: 1200000,
    end_date: "2025-06-30",
    max_usage: 12,
  },
];
