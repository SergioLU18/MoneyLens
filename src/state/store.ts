import { configureStore } from "@reduxjs/toolkit";
import expenseTagsReducer from './expenseTags'

export const store = configureStore({
    reducer: {
        expenseTags: expenseTagsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch