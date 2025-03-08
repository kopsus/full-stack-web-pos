/*
  Warnings:

  - You are about to alter the column `voucher_end` on the `voucher` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `voucher` MODIFY `voucher_end` DATETIME(3) NOT NULL;
