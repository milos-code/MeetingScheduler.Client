import axios from "axios";

export const removeEmployee = async (employeeId, token, setEmployees, setManagedEmployees, managedEmployees) => {
    try {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };

        const response = await axios.post(
            'http://localhost:32768/api/User/UnassignEmployeeToPeopleManager',
            { userId: employeeId },
            config
        );

        console.log(JSON.stringify(response.data));

        const employeeToRemove = managedEmployees.find(emp => emp.id === employeeId);
        setManagedEmployees(managedEmployees.filter(emp => emp.id !== employeeId));
        setEmployees(prev => [...prev, employeeToRemove]);
        
    } catch (err) {
        console.error(err);
        alert('Failed to remove employee.');
    }
};