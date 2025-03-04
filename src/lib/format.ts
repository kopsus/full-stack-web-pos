const formatIDR = (amount: number | bigint): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dateObj);

  return formattedDate;
};

export { formatIDR, formatDate };
