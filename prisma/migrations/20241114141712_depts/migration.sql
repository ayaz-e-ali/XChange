-- CreateTable
CREATE TABLE "depts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    CONSTRAINT "depts_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency" ("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE
);
