-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);
