/*
  Warnings:

  - You are about to drop the column `uptadedAt` on the `note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `note` DROP COLUMN `uptadedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
