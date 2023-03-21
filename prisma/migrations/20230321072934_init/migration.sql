-- AlterTable
ALTER TABLE "PrivateMessages" ADD COLUMN     "to_id" INTEGER;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "PrivateMessages" ADD CONSTRAINT "PrivateMessages_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
