/*
  Warnings:

  - Added the required column `episode_name` to the `LastWatched` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `LastWatched` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LastWatched" ADD COLUMN     "episode_name" TEXT NOT NULL,
ADD COLUMN     "network" INTEGER NOT NULL;
