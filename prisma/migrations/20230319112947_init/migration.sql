/*
  Warnings:

  - You are about to drop the column `name` on the `ChatroomHistorys` table. All the data in the column will be lost.
  - Added the required column `content` to the `ChatroomHistorys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatroomHistorys" DROP COLUMN "name",
ADD COLUMN     "content" VARCHAR(255) NOT NULL;
