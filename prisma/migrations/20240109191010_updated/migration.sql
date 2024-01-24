/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `GameSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gamesession` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `GameSession_userId_key` ON `GameSession`(`userId`);
