import * as React from 'react';
import { Typography, Modal, TextField } from '@mui/material';
import { ModalContent } from './styles';
import { Expense, ExpenseTag } from '../../types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { supabase } from '../../supabaseClient';

interface ExpenseModalProps {
    open: boolean;
    onClose: VoidFunction;
    onSubmit: (expense: Expense) => void;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({open, onClose, onSubmit}) => {

    const [tags, setTags] = React.useState<ExpenseTag[]>([])
    const [amount, setAmount] = React.useState<number>();
    const [date, setDate] = React.useState<Dayjs | null>();
    const [description, setDescription] = React.useState<string>()
    const [tagId, setTagId] = React.useState<number>()

    const handleClose = () => {
        setAmount(undefined)
        setDate(null)
        setDescription(undefined)
        onClose();
    }

    const handleSubmit = () => {
        if(!amount || !description || !date) return
        onSubmit({
            amount: amount,
            description: description,
            date: date.toDate(),
            expenseTagId: tagId
        })
        handleClose()
    }

    React.useEffect(() => {
        const fetchTags = async () => {
            const { data, error } = await supabase.from('expense_tag').select()
            if (error) {
                console.error('Error fetching tags:', error);
            }
            else if(data.length > 0) {
                setTags(data)
            }
        };

        fetchTags();
    }, [])

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalContent>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add new expense
                </Typography>
                <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*'
                    }}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <TextField 
                    label="Description"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Date" 
                        value={date} 
                        onChange={(newDate) => setDate(newDate)} 
                    />
                </LocalizationProvider>
                <FormControl fullWidth>
                    <InputLabel id="expense-tag">Tag</InputLabel>
                    <Select
                        labelId="expense-tag"
                        id="demo-simple-select"
                        value={tagId?.toString()}
                        label="Tag"
                        onChange={(e: SelectChangeEvent) => setTagId(Number(e.target.value))}
                    >
                        {tags.map((tag, index) => (
                            <MenuItem key={`tag-select-${index}`} value={tag.id}>{tag.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <button onClick={handleSubmit}>
                    Create expense
                </button>
            </ModalContent>
        </Modal>
    )
}