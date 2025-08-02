-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Currency" (
    "currencyId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT
);

-- CreateTable
CREATE TABLE "ExchangeRate" (
    "rateId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exchangeRate" INTEGER NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "incomingCurrencyId" INTEGER NOT NULL,
    "outgoingCurrencyId" INTEGER NOT NULL,
    CONSTRAINT "ExchangeRate_incomingCurrencyId_fkey" FOREIGN KEY ("incomingCurrencyId") REFERENCES "Currency" ("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExchangeRate_outgoingCurrencyId_fkey" FOREIGN KEY ("outgoingCurrencyId") REFERENCES "Currency" ("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "incomingAmount" INTEGER NOT NULL,
    "outgoingAmount" INTEGER NOT NULL,
    "name" TEXT,
    "note" TEXT,
    "exchangeRateId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_exchangeRateId_fkey" FOREIGN KEY ("exchangeRateId") REFERENCES "ExchangeRate" ("rateId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "App" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "marketName" TEXT NOT NULL,
    "version" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "debts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "forUs" BOOLEAN NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "debts_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency" ("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stock" (
    "stockId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "currencyId" INTEGER NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Stock_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency" ("currencyId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_currencyId_key" ON "Stock"("currencyId");
