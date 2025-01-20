import * as React from 'react';
import { StyledCard, Row } from './styles';
import { Expense } from '../../types';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

interface ExpenseCardProps {
    expense: Expense;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {

    const tags = useSelector((state: RootState) => state.expenseTags)

    const getTagName = (id?: number) => {
        if(!id || !tags.length) {
            return "No tag"
        }
        return tags.filter((tag) => tag.id === id)[0].name
    }

    return (
        <StyledCard>
            <Row>
                <p>{expense.description}</p>
                <p>${expense.amount}</p>
            </Row>
            <Row>
                <p>{format(expense.date, 'MM/dd/yyyy')}</p>
                <p>{getTagName(expense.expenseTagId)}</p>
            </Row>
        </StyledCard>
    )
}