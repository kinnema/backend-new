/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "LastWatched" (
    "id" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "episode" INTEGER NOT NULL,
    "isWatched" BOOLEAN DEFAULT false,
    "tmdbId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "atSecond" INTEGER NOT NULL,

    CONSTRAINT "LastWatched_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LastWatched" ADD CONSTRAINT "LastWatched_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
