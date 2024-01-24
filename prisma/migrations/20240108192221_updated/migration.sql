/*
  Warnings:

  - You are about to drop the column `userId` on the `gamesession` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `gamesession` DROP FOREIGN KEY `GameSession_userId_fkey`;

-- DropIndex
DROP INDEX `GameSession_roomId_userId_key` ON `gamesession`;

-- AlterTable
ALTER TABLE `gamesession` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_id_fkey` FOREIGN KEY (`id`) REFERENCES `GameSession`(`roomId`) ON DELETE RESTRICT ON UPDATE CASCADE;
