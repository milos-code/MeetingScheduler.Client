import React from 'react';
import { Select, useId } from '@fluentui/react-components';

function FreeEmployees({ employees, selectedEmployeeId, setSelectedEmployeeId, handleAddEmployee }) {
    const selectId = useId('user-select');

    return (
        <div className="div-people-manager">
            <label htmlFor={selectId} className="label">Select Employee</label>
            <Select
                id={selectId}
                className="select-box"
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                value={selectedEmployeeId}
            >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                        {employee.email} - {employee.position}
                    </option>
                ))}
            </Select>
            <button
                className="add-employee-button"
                onClick={handleAddEmployee}
            >
                Assign-Employee
            </button>
        </div>
    );
}

export default FreeEmployees;