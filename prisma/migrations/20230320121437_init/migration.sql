/*
  Warnings:

  - You are about to drop the column `subjectsId` on the `ProductRatings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductRatings" DROP CONSTRAINT "ProductRatings_subjectsId_fkey";

-- AlterTable
ALTER TABLE "ProductRatings" DROP COLUMN "subjectsId";
