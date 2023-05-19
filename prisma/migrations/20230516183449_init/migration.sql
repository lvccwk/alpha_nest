-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "user_type" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subjects" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "chinese_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teachers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "info" TEXT NOT NULL,
    "rating" INTEGER,
    "school" TEXT NOT NULL,
    "experience" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FollowedTeachers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,

    CONSTRAINT "FollowedTeachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherSubjects" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,

    CONSTRAINT "TeacherSubjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "price" INTEGER NOT NULL,
    "product_type" VARCHAR(255) NOT NULL,
    "avg_rating" INTEGER,
    "file_url" TEXT NOT NULL,
    "image" TEXT,
    "info" TEXT NOT NULL,
    "is_onsale" BOOLEAN DEFAULT true,
    "subject_id" INTEGER,
    "teacher_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carts" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartDetails" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "cart_id" INTEGER,
    "is_buying" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductRatings" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "student_id" INTEGER,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductRatings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseHistorys" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
    "student_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseHistorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timetables" (
    "id" SERIAL NOT NULL,
    "time_slot" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "subject_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timetables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chatrooms" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chatrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatroomHistorys" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "chatroom_id" INTEGER,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatroomHistorys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatroomParticipants" (
    "id" SERIAL NOT NULL,
    "chatroom_id" INTEGER,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatroomParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateMessages" (
    "id" SERIAL NOT NULL,
    "from_id" INTEGER,
    "to_id" INTEGER,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrivateMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableTimes" (
    "id" SERIAL NOT NULL,
    "time_slot" TEXT NOT NULL,
    "time_during" INTEGER NOT NULL,
    "teacher_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailableTimes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR NOT NULL,
    "user_id" INTEGER,
    "teacher_id" INTEGER,
    "available_time_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_user_id_key" ON "Teachers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "FollowedTeachers_user_id_teacher_id_key" ON "FollowedTeachers"("user_id", "teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "Carts_student_id_key" ON "Carts"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductRatings_rating_key" ON "ProductRatings"("rating");

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowedTeachers" ADD CONSTRAINT "FollowedTeachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FollowedTeachers" ADD CONSTRAINT "FollowedTeachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherSubjects" ADD CONSTRAINT "TeacherSubjects_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherSubjects" ADD CONSTRAINT "TeacherSubjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "ChatroomHistorys" ADD CONSTRAINT "ChatroomHistorys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatroomParticipants" ADD CONSTRAINT "ChatroomParticipants_chatroom_id_fkey" FOREIGN KEY ("chatroom_id") REFERENCES "Chatrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatroomParticipants" ADD CONSTRAINT "ChatroomParticipants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessages" ADD CONSTRAINT "PrivateMessages_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateMessages" ADD CONSTRAINT "PrivateMessages_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableTimes" ADD CONSTRAINT "AvailableTimes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_available_time_id_fkey" FOREIGN KEY ("available_time_id") REFERENCES "AvailableTimes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
