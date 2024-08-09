/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Prompt` table. All the data in the column will be lost.
  - Added the required column `author` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PromptTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PromptTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Prompt" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PromptTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL
);
INSERT INTO "new_Prompt" ("content", "id") SELECT "content", "id" FROM "Prompt";
DROP TABLE "Prompt";
ALTER TABLE "new_Prompt" RENAME TO "Prompt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PromptTags_AB_unique" ON "_PromptTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PromptTags_B_index" ON "_PromptTags"("B");
