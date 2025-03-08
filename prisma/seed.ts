import { PrismaClient, EnumRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import dayjs from "dayjs";

const prisma = new PrismaClient();

async function main() {
  // create user
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
        voucher_end: dayjs("2025-12-31").toDate(),
      },
    ].map((voucher) => prisma.voucher.create({ data: voucher }))
  );

  // create topping
  await Promise.all(
    [
      { name: "Keju", price: 4000 },
      { name: "Sosis", price: 3000 },
    ].map((topping) => prisma.topping.create({ data: topping }))
  );

  // create payment
  const payments = await Promise.all(
    [
      { name: "Cash" },
      { name: "BCA" },
      { name: "BRI" },
      { name: "MANDIRI" },
      { name: "Qris" },
    ].map((payment) => prisma.payment.create({ data: payment }))
  );

  // create products
  const products = await Promise.all(
    [
      {
        name: "Sate",
        price: 13000,
        image:
          "https://asset.kompas.com/crops/-A2hEf0v0sxHPItq5lVR7j30K7c=/95x0:939x563/1200x800/data/photo/2022/07/10/62ca309364500.jpeg",
      },
      {
        name: "Nasi Goreng",
        price: 12000,
        image:
          "https://asset.kompas.com/crops/U6YxhTLF-vrjgM8PN3RYTHlIxfM=/84x60:882x592/1200x800/data/photo/2021/11/17/61949959e07d3.jpg",
      },
      {
        name: "Bakso",
        price: 12000,
        image:
          "https://asset.kompas.com/crops/cB-7HVfVN0Ci4yQKdoswSrFSJeU=/0x0:698x465/1200x800/data/photo/2021/01/08/5ff86f55cf2e4.jpg",
      },
    ].map((product) => prisma.product.create({ data: product }))
  );

  // create category for each product
  await Promise.all(
    products.map((product, index) =>
      prisma.category.create({
        data: {
          name: `Category ${index + 1}`,
          product_id: product.id,
        },
      })
    )
  );

  // create stock for each product
  await Promise.all(
    products.map((product) =>
      prisma.stock.create({
        data: {
          stock: Math.floor(Math.random() * 100) + 10, // stok random antara 10-100
          product_id: product.id,
        },
      })
    )
  );

  // create transaksi
  await Promise.all(
    products.map((product, index) =>
      prisma.transaksi.create({
        data: {
          customer_name: `Customer ${index + 1}`,
          total_amount: product.price * 2, // Simulasi pembelian 2 pcs
          user: { connect: { id: users[0].id } },
          payment: { connect: { id: payments[index % payments.length].id } },
          transaksi_product: {
            create: [
              {
                product: { connect: { id: product.id } },
                quantity: 2, // Set jumlah produk dalam transaksi
              },
            ],
          },
        },
      })
    )
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
