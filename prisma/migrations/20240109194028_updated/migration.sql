-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_id_fkey`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_email_key` TO `User_email_key`;
