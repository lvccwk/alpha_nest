-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "user_type" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subjects" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "chinese_name" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teachers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "info" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "price" INTEGER NOT NULL,
    "product_type" VARCHAR(255) NOT NULL,
    "avg_rating" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "user_id" INTEGER,
    "subject_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carts" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartDetails" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "cart_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "CartDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductRatings" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "student_id" INTEGER,
    "subjectsId" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ProductRatings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseHistorys" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "student_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "PurchaseHistorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timetables" (
    "id" SERIAL NOT NULL,
    "time_slot" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "subject_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Timetables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chatrooms" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Chatrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatroomHistorys" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "chatroom_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "usersId" INTEGER,

    CONSTRAINT "ChatroomHistorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatoomParticipants" (
    "id" SERIAL NOT NULL,
    "chatroom_id" INTEGER,
    "user_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "ChatoomParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateMessages" (
    "id" SERIAL NOT NULL,
    "from_id" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "PrivateMessages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Carts_student_id_key" ON "Carts"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "CartDetails_cart_id_key" ON "CartDetails"("cart_id");

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carts" ADD CONSTRAINT "Carts_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDetails" ADD CONSTRAINT "CartDetails_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDetails" ADD CONSTRAINT "CartDetails_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Carts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRatings" ADD CONSTRAINT "ProductRatings_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRatings" ADD CONSTRAINT "ProductRatings_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRatings" ADD CONSTRAINT "ProductRatings_subjectsId_fkey" FOREIGN KEY ("subjectsId") REFERENCES "Subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseHistorys" ADD CONSTRAINT "PurchaseHistorys_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseHistorys" ADD CONSTRAINT "PurchaseHistorys_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetables" ADD CONSTRAINT "Timetables_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetables" ADD CONSTRAINT "Timetables_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatrooms" ADD CONSTRAINT "Chatrooms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatroomHistorys" ADD CONSTRAINT "ChatroomHistorys_chatroom_id_fkey" FOREIGN KEY ("chatroom_id") REFERENCES "Chatrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatroomHistorys" ADD CONSTRAINT "ChatroomHistorys_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatoomParticipants" ADD CONSTRAINT "ChatoomParticipants_chatroom_id_fkey" FOREIGN KEY ("chatroom_id") REFERENCES "Chatrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatoomParticipants" ADD CONSTRAINT "ChatoomParticipants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessages" ADD CONSTRAINT "PrivateMessages_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
