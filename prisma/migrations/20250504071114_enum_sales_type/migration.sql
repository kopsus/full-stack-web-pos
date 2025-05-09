-- AlterTable
ALTER TABLE `transaksi` MODIFY `sales_type` ENUM('DO', 'DineIn', 'Gojek', 'TakeAway') NOT NULL DEFAULT 'TakeAway';
