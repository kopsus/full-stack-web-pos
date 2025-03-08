import { PrismaClient, EnumRole } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
import dayjs from "dayjs";

async function main() {
  // create user
  await Promise.all(
    [
      { username: "admin", role: EnumRole.admin },
      { username: "cashier", role: EnumRole.cashier },
    ].map(async (user) => {
      const password = await bcrypt.hash("user123", 10);
      return prisma.user.create({
        data: {
          ...user,
          password,
        },
      });
    })
  );

  // create voucher
  await Promise.all(
    [
      {
        name: "ramadahan",
        percentage: 20,
        minimum_price: 20000,
        maximum_price: 50000,
        max_usage: 20,
        voucher_end: dayjs("2025-05-05").toDate(),
      },
      {
        name: "new year",
        percentage: 50,
        minimum_price: 100000,
        maximum_price: 200000,
        max_usage: 5,
        voucher_end: dayjs("2025-05-05").toDate(),
      },
    ].map((voucher) =>
      prisma.voucher.create({
        data: {
          ...voucher,
        },
      })
    )
  );

  //create topping
  await Promise.all(
    [
      { name: "Keju", price: 4000 },
      { name: "Sosis", price: 3000 },
    ].map((topping) => prisma.topping.create({ data: { ...topping } }))
  );

  // create payment
  await Promise.all(
    [
      { name: "Cash" },
      { name: "BCA" },
      { name: "BRI" },
      { name: "MANDIRI" },
      { name: "Qris" },
    ].map((payment) => prisma.payment.create({ data: { ...payment } }))
  );

  /// create products
  await Promise.all([{}]);

  console.log("Seeding data berhasil.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
