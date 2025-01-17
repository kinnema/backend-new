/*
  Warnings:

  - Changed the type of `tmdbId` on the `LastWatched` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "LastWatched" DROP COLUMN "tmdbId",
ADD COLUMN     "tmdbId" INTEGER NOT NULL;
