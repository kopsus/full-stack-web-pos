import { PrismaClient, EnumRole } from "@prisma/client";
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

  const cashierUser = users.find((u) => u.role === EnumRole.cashier);
  let shift = null;

  // Seed Shift (hanya untuk cashier)
  if (cashierUser) {
    shift = await prisma.shift.create({
      data: {
        user_id: cashierUser.id,
        start_time: new Date(),
        // end_time: new Date() // Kalau ingin simulasi shift selesai
      },
    });
  }

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
  const sampleProducts = [
    {
      name: "Nasi Goreng",
      price: 15000,
      quantity: 50,
      image: "nasi.jpg",
      category_id: categories[0].id,
    },
    {
      name: "Es Teh",
      price: 5000,
      quantity: 100,
      image: "esteh.jpg",
      category_id: categories[1].id,
    },
  ];

  const products = await Promise.all(
    sampleProducts.map((product) => prisma.product.create({ data: product }))
  );

  // Seed Vouchers
  const vouchers = await Promise.all(
    [
      {
        discount: 20,
        name: "ramadhan",
        minimum_price: 10000,
        maximum_price: 30000,
        max_usage: 10,
        voucher_end: new Date("2025-12-31"),
      },
      {
        discount: 50,
        name: "new year",
        minimum_price: 10000,
        maximum_price: 30000,
        max_usage: 10,
        voucher_end: new Date("2025-12-31"),
      },
    ].map((voucher) => prisma.voucher.create({ data: voucher }))
  );

  // Seed Toppings
  const toppings = await Promise.all(
    [
      { name: "Keju", price: 4000, quantity: 2000 },
      { name: "Sosis", price: 3000, quantity: 2000 },
    ].map((topping) => prisma.topping.create({ data: topping }))
  );

  // Optional: Seed Transaksi untuk testing (jika shift tersedia)
  if (shift) {
    const transaksi = await prisma.transaksi.create({
      data: {
        customer_name: "John Doe",
        total_amount: 19000,
        paid_amount: 20000,
        change: 1000,
        sales_type: "DO",
        shift_id: shift.id,
        payment_id: payments[0].id, // Cash
        voucher_id: vouchers[0].id,
        transaksi_product: {
          create: [
            {
              product_id: products[0].id,
              quantity: 1,
              subtotal: products[0].price,
            },
          ],
        },
        transaksi_topping: {
          create: [
            {
              topping_id: toppings[0].id,
              quantity: 1,
              subtotal: toppings[0].price,
            },
          ],
        },
      },
    });

    console.log("Contoh transaksi berhasil dibuat:", transaksi.id);
  }

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
