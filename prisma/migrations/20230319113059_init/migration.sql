/*
  Warnings:

  - You are about to drop the column `usersId` on the `ChatroomHistorys` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatroomHistorys" DROP CONSTRAINT "ChatroomHistorys_usersId_fkey";

-- AlterTable
ALTER TABLE "ChatroomHistorys" DROP COLUMN "usersId";
