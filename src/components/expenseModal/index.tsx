import * as React from 'react';
import { Typography, Modal, Box } from '@mui/material';

interface ExpenseModalProps {
    open: boolean;
    onClose: VoidFunction;
    handleSubmit: VoidFunction;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#0000000',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ExpenseModal: React.FC<ExpenseModalProps> = ({open, onClose, handleSubmit}) => {

    const handleClose = () => {
        //TODO: Reset inputs
        onClose();
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    )
}