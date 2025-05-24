"use server";

import { revalidatePath } from "next/cache";
import { ProductSchema } from "../formValidationSchemas/product";
import prisma from "../prisma";
import { responServerAction } from "./responseServerAction";
import { uploadImage } from "./uploadImage";
import path from "path";
import fs from "fs";

export const createProduct = async (data: ProductSchema, image?: FormData) => {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: {
        name: data.name,
      },
    });

    if (existingProduct) {
      return responServerAction({
        statusError: true,
        messageError: `Product dengan nama ${existingProduct.name} sudah ada`,
        data: null,
      });
    }

    let imagePath = null;

    if (image) {
      const result = await uploadImage(image);
      if (result.error.status) {
        return responServerAction({
          statusError: true,
          messageError: result.error.message,
        });
      }
      imagePath = result.data;
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        category_id: data.category_id,
        image: imagePath,
      },
    });

    revalidatePath("/product");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil membuat product",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal membuat product",
    });
  }
};

export const updateProduct = async (
  id: string,
  data: ProductSchema,
  image?: FormData
) => {
  try {
    // Cek apakah ada produk lain dengan nama yang sama, kecuali produk yang sedang diupdate
    const existingProduct = await prisma.product.findUnique({
      where: {
        name: data.name,
        NOT: { id },
      },
    });

    if (existingProduct) {
      return responServerAction({
        statusError: true,
        messageError: `Product dengan nama ${existingProduct.name} sudah ada`,
        data: null,
      });
    }

    // Ambil data produk lama
    const oldProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!oldProduct) {
      return responServerAction({
        statusError: true,
        messageError: "Produk tidak ditemukan",
      });
    }

    let imagePath = oldProduct.image; // Default tetap pakai gambar lama

    // Jika ada image baru yang diunggah
    if (image) {
      const result = await uploadImage(image);
      if (result.error.status) {
        return responServerAction({
          statusError: true,
          messageError: result.error.message,
        });
      }

      // Hapus gambar lama jika ada
      if (oldProduct.image) {
        const oldImagePath = path.join(
          process.cwd(),
          "/var/www/uploads",
          oldProduct.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      imagePath = result.data; // Update dengan image baru
    }

    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        category_id: data.category_id,
        image: imagePath,
      },
    });

    revalidatePath("/product");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil mengubah data produk",
    });
  } catch (err) {
    console.log(err);
    return responServerAction({
      statusError: true,
      messageError: "Gagal mengubah data produk",
    });
  }
};

export const deleteProduct = async (id: string) => {
  try {
    // Ambil data produk sebelum dihapus
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return responServerAction({
        statusError: true,
        messageError: "Produk tidak ditemukan",
      });
    }

    // Hapus produk dari database
    await prisma.product.delete({
      where: { id },
    });

    // Hapus gambar dari folder `public/uploads` jika ada
    if (product.image) {
      const imagePath = path.join(
        process.cwd(),
        "/var/www/uploads",
        product.image
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    revalidatePath("/product");
    return responServerAction({
      statusSuccess: true,
      messageSuccess: "Berhasil menghapus produk",
    });
  } catch (error) {
    console.error(error);
    return responServerAction({
      statusError: true,
      messageError: "Gagal menghapus produk",
    });
  }
};
