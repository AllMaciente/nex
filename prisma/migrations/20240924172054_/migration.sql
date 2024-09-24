-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_requests" (
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'POST',
    "url" TEXT NOT NULL,
    "body" TEXT NOT NULL DEFAULT '{}'
);
INSERT INTO "new_requests" ("body", "name", "type", "url") SELECT "body", "name", "type", "url" FROM "requests";
DROP TABLE "requests";
ALTER TABLE "new_requests" RENAME TO "requests";
CREATE UNIQUE INDEX "requests_name_key" ON "requests"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
