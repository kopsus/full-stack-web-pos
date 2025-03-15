import { PrismaClient, EnumRole, EnumSalesType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Seed User
  const users = await Promise.all(
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
  const payments = await Promise.all(
    ["Cash", "BCA", "BRI", "MANDIRI", "Qris"].map((name) =>
      prisma.payment.create({ data: { name } })
    )
  );

  // Seed Categories
  const categories = await Promise.all(
    ["Makanan", "Minuman", "Snack"].map((name) =>
      prisma.category.create({ data: { name } })
    )
  );

  // Seed Products
  const products = await Promise.all(
    [
      {
        name: "Sate",
        price: 13000,
        image:
          "https://asset.kompas.com/crops/-A2hEf0v0sxHPItq5lVR7j30K7c=/95x0:939x563/1200x800/data/photo/2022/07/10/62ca309364500.jpeg",
        quantity: 10,
        category_id: categories[0].id, // Makanan
      },
      {
        name: "Nasi Goreng",
        price: 12000,
        image:
          "https://asset.kompas.com/crops/U6YxhTLF-vrjgM8PN3RYTHlIxfM=/84x60:882x592/1200x800/data/photo/2021/11/17/61949959e07d3.jpg",
        quantity: 10,
        category_id: categories[0].id, // Makanan
      },
      {
        name: "Bakso",
        price: 12000,
        image:
          "https://asset.kompas.com/crops/cB-7HVfVN0Ci4yQKdoswSrFSJeU=/0x0:698x465/1200x800/data/photo/2021/01/08/5ff86f55cf2e4.jpg",
        quantity: 10,
        category_id: categories[0].id, // Makanan
      },
    ].map((product) => prisma.product.create({ data: product }))
  );

  // Seed Vouchers
  const vouchers = await Promise.all(
    [
      {
        discount: 20,
        name: "ramadhan",
      },
      {
        discount: 50,
        name: "new year",
      },
    ].map((voucher) => prisma.voucher.create({ data: voucher }))
  );

  // Seed Toppings
  const toppings = await Promise.all(
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
