/*
  Warnings:

  - You are about to drop the column `title` on the `Prompt` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Prompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prompt" ("content", "createdAt", "id", "updatedAt", "userId") SELECT "content", "createdAt", "id", "updatedAt", "userId" FROM "Prompt";
DROP TABLE "Prompt";
ALTER TABLE "new_Prompt" RENAME TO "Prompt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
