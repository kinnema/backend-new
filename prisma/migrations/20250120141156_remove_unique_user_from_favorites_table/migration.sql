/*
  Warnings:

  - A unique constraint covering the columns `[tmdbId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Favorite_userId_tmdbId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_tmdbId_key" ON "Favorite"("tmdbId");
