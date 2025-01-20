import * as React from 'react';
import { Modal, Typography } from '@mui/material';
import { ModalContent } from './styles';

interface ImportExpensesModalProps {
    open: boolean;
    onClose: VoidFunction;
}

export const ImportExpensesModal: React.FC<ImportExpensesModalProps> = ({ open, onClose }) => {

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
        const header = lines[0]?.split(',') || [];
        const body = lines.slice(1).map((line) => line.split(','));
    
        console.log(header);
        console.log(body);
      };

    return (
        <Modal open={open} onClose={onClose}>
            <ModalContent>
                <Typography>
                    Here we import the data
                </Typography>
                <input type="file" accept=".csv" onChange={handleFileChange}/>
            </ModalContent>
        </Modal>
    )
}