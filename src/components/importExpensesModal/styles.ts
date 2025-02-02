import { Box } from '@mui/material';
import styled from 'styled-components';

export const ModalContent = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: #fff;
    padding: 16px;
    border-radius: 10px;
    color: #000;
    display: flex;
    gap: 16px;
    flex-direction: column;
`