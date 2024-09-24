-- CreateTable
CREATE TABLE "requests" (
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'POST',
    "url" TEXT NOT NULL,
    "body" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "requests_name_key" ON "requests"("name");
