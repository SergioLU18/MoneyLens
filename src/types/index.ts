export interface Expense {
    id?: number;
    amount: number;
    date: Date;
    description: string;
    expenseTagId?: number;
}

export interface ExpenseTag {
    id: number;
    name: string;
}