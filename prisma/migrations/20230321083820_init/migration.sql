-- AlterTable
ALTER TABLE "ChatroomHistorys" ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ChatroomHistorys" ADD CONSTRAINT "ChatroomHistorys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
