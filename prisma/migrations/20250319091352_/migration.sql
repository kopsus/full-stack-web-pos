/*
  Warnings:

  - Added the required column `subtotal` to the `TransaksiTopping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaksi_id` to the `TransaksiTopping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaksitopping` DROP FOREIGN KEY `TransaksiTopping_topping_id_fkey`;

-- DropIndex
DROP INDEX `TransaksiTopping_topping_id_fkey` ON `transaksitopping`;

-- AlterTable
ALTER TABLE `transaksitopping` ADD COLUMN `subtotal` INTEGER NOT NULL,
    ADD COLUMN `transaksi_id` VARCHAR(191) NOT NULL,
    ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `TransaksiTopping` ADD CONSTRAINT `TransaksiTopping_transaksi_id_fkey` FOREIGN KEY (`transaksi_id`) REFERENCES `Transaksi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransaksiTopping` ADD CONSTRAINT `TransaksiTopping_topping_id_fkey` FOREIGN KEY (`topping_id`) REFERENCES `Topping`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
