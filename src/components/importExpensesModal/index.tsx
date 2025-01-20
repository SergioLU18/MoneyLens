import * as React from 'react';
import { Modal } from '@mui/material';
import { ModalContent } from './styles';
import { Expense } from '../../types';
import { ExpenseCard } from '../expenseCard';

interface ImportExpensesModalProps {
    open: boolean;
    onClose: VoidFunction;
}

export const ImportExpensesModal: React.FC<ImportExpensesModalProps> = ({ open, onClose }) => {

    const [importedExpenses, setImportedExpenses] = React.useState<Expense[]>([])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            const csvData = e.target?.result as string;
            processCSV(csvData);
          };
    
          reader.readAsText(file);
        }
    };
    
    const processCSV = (data: string) => {
        const lines = data.split('\n').map((line) => line.trim());
        const body = lines.slice(1).map((line) => line.split(','));
    
        setImportedExpenses(body.map((row) => {
            return {
                description: row[0],
                amount: parseFloat(row[1]),
                date: new Date(row[2]),
                expenseTagId: undefined
            }
        }))
    };

    const handleClose = () => {
        setImportedExpenses([])
        onClose()
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalContent>
                <input type="file" accept=".csv" onChange={handleFileChange}/>
                {importedExpenses.map((expense, index) => (
                    <ExpenseCard key={index} expense={expense} />
                ))}
            </ModalContent>
        </Modal>
    )
}