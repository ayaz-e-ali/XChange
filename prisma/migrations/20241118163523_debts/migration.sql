/*
  Warnings:

  - You are about to drop the `depts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "depts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "debts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "debts_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency" ("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE
);
