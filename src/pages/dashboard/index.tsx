import * as React from 'react';
import { ExpenseModal } from '../../components/expenseModal';

export const Dashboard: React.FC = () => {

    const [modalOpen, setModalOpen] = React.useState(false);

    const handleModalSubmit = () => {
        //TODO: Add logic to add new expense
    }

    return (
        <div>
            <ExpenseModal open={modalOpen} handleSubmit={handleModalSubmit} onClose={() => setModalOpen(false)}/>
            <button onClick={() => setModalOpen(true)}>
                Open Modal
            </button>
        </div>
    )
}