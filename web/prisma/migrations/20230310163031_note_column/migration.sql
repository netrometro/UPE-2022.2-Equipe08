/*
  Warnings:

  - You are about to drop the column `body` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `note` table. All the data in the column will be lost.
  - You are about to drop the `shared` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `shared` DROP FOREIGN KEY `Shared_noteId_fkey`;

-- DropForeignKey
ALTER TABLE `shared` DROP FOREIGN KEY `Shared_userId_fkey`;

-- AlterTable
ALTER TABLE `note` DROP COLUMN `body`,
    DROP COLUMN `title`,
    ADD COLUMN `text` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `shared`;
