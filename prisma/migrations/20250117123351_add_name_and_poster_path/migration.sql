/*
  Warnings:

  - Added the required column `name` to the `LastWatched` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `LastWatched` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LastWatched" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL;
