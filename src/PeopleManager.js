import React, { useEffect, useState } from "react";
import './PeopleManager.css';
import { addEmployee } from "./AddEmployee";
import { removeEmployee } from "./RemoveEmployee";
import { loadEmployees } from "./LoadEmployees";
import ManagedEmployeesTable from "./ManagedEmployees";
import FreeEmployees from './FreeEmployees';

function PeopleManager() {
    const [employees, setEmployees] = useState([]);
    const [managedEmployees, setManagedEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        loadEmployees(setEmployees, setManagedEmployees, setLoading, setError);
    }, []);

    const handleAddEmployee = async () => {
        await addEmployee(selectedEmployeeId, token, setEmployees, setManagedEmployees, employees);
    };

    const handleRemoveEmployee = async (employeeId) => {
        await removeEmployee(employeeId, token, setEmployees, setManagedEmployees, managedEmployees);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div className="people-manager-container">
                <FreeEmployees 
                    employees={employees}
                    selectedEmployeeId={selectedEmployeeId}
                    setSelectedEmployeeId={setSelectedEmployeeId}
                    handleAddEmployee={handleAddEmployee}
                />
                <div className="div-people-manager">
                    <label className="label">Employees Managed by You:</label>
                    <ManagedEmployeesTable
                        managedEmployees={managedEmployees}
                        onRemove={handleRemoveEmployee}
                    />
                </div>
            </div>
        </div>
    );
}

export default PeopleManager;