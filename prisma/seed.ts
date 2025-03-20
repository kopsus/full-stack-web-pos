import { PrismaClient, EnumRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed User
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

  // Seed Payment Methods
  await Promise.all(
    ["Cash", "BCA", "BRI", "MANDIRI", "Qris"].map((name) =>
      prisma.payment.create({ data: { name } })
    )
  );

  // Seed Categories
  await Promise.all(
    ["Makanan", "Minuman", "Snack"].map((name) =>
      prisma.category.create({ data: { name } })
    )
  );

  // Seed Vouchers
  await Promise.all(
    [
      {
        discount: 20,
        name: "ramadhan",
        minimum_price: 10000,
        maximum_price: 30000,
        max_usage: 10,
      },
      {
        discount: 50,
        name: "new year",
        minimum_price: 10000,
        maximum_price: 30000,
        max_usage: 10,
      },
    ].map((voucher) => prisma.voucher.create({ data: voucher }))
  );

  // Seed Toppings
  await Promise.all(
    [
      { name: "Keju", price: 4000 },
      { name: "Sosis", price: 3000 },
    ].map((topping) => prisma.topping.create({ data: topping }))
  );

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
