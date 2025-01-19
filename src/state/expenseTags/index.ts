import { ExpenseTag } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ExpenseTag[] = []


const expenseTagsSlice = createSlice({
    name: "expenseTags",
    initialState: initialState,
    reducers: {
        setExpenseTags: (_, action: PayloadAction<ExpenseTag[]>) => action.payload,
    }
})

export const { setExpenseTags } = expenseTagsSlice.actions

export default expenseTagsSlice.reducer