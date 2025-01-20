import * as React from 'react';
import { ExpenseModal } from '../../components/expenseModal';
import { DashboardContainer, Actions, Row } from './styles';
import { Expense } from '../../types';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ImportExpensesModal } from '../../components/importExpensesModal';
import { ExpenseCard } from '../../components/expenseCard';

export const Dashboard: React.FC = () => {

    const [user, setUser] = React.useState<User>();
    const [expenseModalOpen, setExpenseModalOpen] = React.useState(false);
    const [importModalOpen, setImportModalOpen] = React.useState(false);
    const [expenses, setExpenses] = React.useState<Expense[]>([])
    const [filteredExpenses, setFilteredExpenses] = React.useState<Expense[]>([])
    const [filterExpenseTagId, setfilterExpenseTagId] = React.useState<number>()

    const navigate = useNavigate();
    const tags = useSelector((state: RootState) => state.expenseTags)

    const handleModalSubmit = async (expense: Expense) => {
        const { error } = await supabase.from('expense').insert({
            user_id: user?.id,
            amount: expense.amount,
            description: expense.description,
            date: expense.date,
            expense_tag_id: expense.expenseTagId
        })
        if(error) {
            console.log(error)
        }
        else {
            setExpenses([
                ...expenses,
                expense
            ])
        }
    }

    const fetchUserExpenses = async (userId: string) => {
        const { data, error } = await supabase.from("expense").select().eq("user_id", userId)
        if(error) {
            console.log(error.message)
        }
        else {
            setExpenses(data.map((expense) => {
                return {
                    date: expense.date,
                    description: expense.description,
                    amount: expense.amount,
                    expenseTagId: expense.expense_tag_id
                }
            }))
        }
    }

    React.useEffect(() => {
        if(!expenses.length) return
        let expensesCopy = [...expenses]
        if(filterExpenseTagId) {
            expensesCopy = expenses.filter((expense) => expense.expenseTagId === filterExpenseTagId)
        }
        setFilteredExpenses(expensesCopy)
    }, [filterExpenseTagId, expenses])

    React.useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
                navigate('/login')
            }
            else if(data.user) {
                setUser(data.user)
                fetchUserExpenses(data.user.id)
            }
        };

        fetchUser();
    }, [])

    return (
        <DashboardContainer>
            <Row>
                <Typography variant="h4" sx={{color: "#000"}}>
                    MoneyLens
                </Typography>
                <Actions>
                    <button onClick={() => setExpenseModalOpen(true)}>
                        Add expense
                    </button>
                    <button onClick={() => setImportModalOpen(true)}>
                        Import from CSV
                    </button>
                </Actions>
            </Row>
            <Row>
                <FormControl>
                    <InputLabel id="expense-tag">Tag</InputLabel>
                    <Select
                        labelId="expense-tag"
                        id="demo-simple-select"
                        value={filterExpenseTagId?.toString() || ""}
                        label="Tag"
                        defaultValue={undefined}
                        onChange={(e: SelectChangeEvent) => setfilterExpenseTagId(Number(e.target.value))}
                        sx={{minWidth: 200}}
                    >
                        <MenuItem value="">
                            <em>Clear</em>
                        </MenuItem>
                        {tags.map((tag, index) => (
                            <MenuItem key={`tag-select-${index}`} value={tag.id}>{tag.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>     
            </Row>
            {filteredExpenses.map((expense, index) => (
                <ExpenseCard key={index} expense={expense} />
            ))}
            <ExpenseModal open={expenseModalOpen} onSubmit={handleModalSubmit} onClose={() => setExpenseModalOpen(false)}/>
            <ImportExpensesModal open={importModalOpen} onClose={() => setImportModalOpen(false)} />
        </DashboardContainer>
    )
}