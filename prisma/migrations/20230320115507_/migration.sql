/*
  Warnings:

  - A unique constraint covering the columns `[rating]` on the table `ProductRatings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rating` to the `ProductRatings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductRatings" ADD COLUMN     "rating" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductRatings_rating_key" ON "ProductRatings"("rating");
