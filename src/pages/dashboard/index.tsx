import * as React from 'react';
import { ExpenseModal } from '../../components/expenseModal';
import { DashboardContainer, DashboardActions, ExpenseCard, ExpenseCardRow } from './styles';
import { Expense } from '../../types';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export const Dashboard: React.FC = () => {

    const [user, setUser] = React.useState<User>();
    const [modalOpen, setModalOpen] = React.useState(false);
    const [expenses, setExpenses] = React.useState<Expense[]>([])

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

    const getTagName = (id?: number) => {
        if(!id) {
            return "No tag"
        }
        return tags.filter((tag) => tag.id === id)[0].name
    }

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
            <DashboardActions>
                <button onClick={() => setModalOpen(true)}>
                    Add expense
                </button>
            </DashboardActions>
            {expenses.map((expense, index) => (
                <ExpenseCard key={index}>
                    <ExpenseCardRow>
                        <p>{expense.description}</p>
                        <p>${expense.amount}</p>
                    </ExpenseCardRow>
                    <ExpenseCardRow>
                        <p>{format(expense.date, 'dd/MM/yyyy')}</p>
                        <p>{getTagName(expense.expenseTagId)}</p>
                    </ExpenseCardRow>
                </ExpenseCard>
            ))}
            <ExpenseModal open={modalOpen} onSubmit={handleModalSubmit} onClose={() => setModalOpen(false)}/>
        </DashboardContainer>
    )
}