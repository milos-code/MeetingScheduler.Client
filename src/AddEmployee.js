import axios from "axios";

export const addEmployee = async (selectedEmployeeId, token, setEmployees, setManagedEmployees, employees) => {
    if(!selectedEmployeeId) {
        alert('Please select an employee.');
        return;
    }

    try {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };

        const response = await axios.post(
            'http://localhost:32768/api/User/AssignEmployeeToPeopleManager',
            { userId: selectedEmployeeId },
            config
        );

        console.log(JSON.stringify(response.data));

        const employeeToAdd = employees.find(emp => emp.id === selectedEmployeeId);
        setEmployees(employees.filter(emp => emp.id !== selectedEmployeeId));
        setManagedEmployees(prev => [...prev, employeeToAdd]);

    } catch (err) {
        console.error(err);
        alert('Failed to add employee.');
    }
};
