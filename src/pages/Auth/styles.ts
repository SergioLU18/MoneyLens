import { Card, Typography } from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Card)`
    padding: 32px;
    gap: 16px;
    flex-direction: column;
    display: flex;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const ControllerTypography = styled(Typography)`
    cursor: pointer;
`