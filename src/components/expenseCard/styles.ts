import styled from "styled-components";
import { Card } from '@mui/material';

export const StyledCard = styled(Card)`
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