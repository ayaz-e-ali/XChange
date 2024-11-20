/*
  Warnings:

  - Added the required column `forUs` to the `debts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_debts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "forUs" BOOLEAN NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "debts_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency" ("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_debts" ("amount", "createDate", "currencyId", "id", "name") SELECT "amount", "createDate", "currencyId", "id", "name" FROM "debts";
DROP TABLE "debts";
ALTER TABLE "new_debts" RENAME TO "debts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
