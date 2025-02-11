'use server';
import { db } from '@/lib/db';
import { auth } from "@clerk/nextjs/server"
import { get } from 'http';

async function getIncomeExpense(): Promise<{
    income?: number;
    expense?: number;
    error?: string;
}> {
    const { userId } = await auth();

    if (!userId) {
        return { error: 'User not found' };
    }

    try {
        const transactions = await db.transaction.findMany({
            where: {userId}
        });

        const amounts = transactions.map((transaction) => transaction.amount);

        const income = amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => acc + item);

        const expense = amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => acc + item);

        return { income, expense: Math.abs(expense) };
    } catch (error) {
        return { error: 'Income & Expenses unable to be updated' };
    }
}

export default getIncomeExpense;
