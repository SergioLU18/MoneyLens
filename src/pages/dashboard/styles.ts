import styled from 'styled-components';
import { Card } from '@mui/material';

export const DashboardContainer = styled.div`
    max-width: 100%;
    padding: 24px;
    height: 100svh;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const Actions = styled.div`
    max-width: 100%;
    display: flex;
    flex-direction: row;
    gap: 8px;
`

export const ExpenseCard = styled(Card)`
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: red;
    gap: 16px;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & > p {
        margin: 0;
    }
`