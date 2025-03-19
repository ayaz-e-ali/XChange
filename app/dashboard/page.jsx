import TransactionsAddForm from "@/components/forms/TransactionAddForm";
import { prisma } from "@/prisma/db";

export default async function Dashboard() {

  const currencies = await prisma.currency.findMany()

  return (
    <div>
      <TransactionsAddForm currencies={currencies} />
    </div>
  );
}
