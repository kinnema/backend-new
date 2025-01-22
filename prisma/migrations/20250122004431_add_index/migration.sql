-- AlterTable
ALTER TABLE "LastWatched" ALTER COLUMN "totalSeconds" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "LastWatched_userId_tmdbId_idx" ON "LastWatched"("userId", "tmdbId");
