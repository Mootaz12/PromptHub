/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PromptTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tag` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tag_name_key";

-- DropIndex
DROP INDEX "_PromptTags_B_index";

-- DropIndex
DROP INDEX "_PromptTags_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PromptTags";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "author" TEXT NOT NULL
);
INSERT INTO "new_Prompt" ("author", "content", "id") SELECT "author", "content", "id" FROM "Prompt";
DROP TABLE "Prompt";
ALTER TABLE "new_Prompt" RENAME TO "Prompt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
