/*
  Warnings:

  - You are about to drop the column `usersId` on the `Subjects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subjects" DROP CONSTRAINT "Subjects_usersId_fkey";

-- AlterTable
ALTER TABLE "Subjects" DROP COLUMN "usersId";
