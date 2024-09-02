import axios from "axios";

export const loadEmployees = async (setEmployees, setManagedEmployees, setLoading, setError) => {
        try {
            const token = sessionStorage.getItem('token');

            const freeUsers = await axios.get('http://localhost:32768/api/User/GetAllFreeEmployees',{
                headers: {
                    Authorization: token
                }
            })
            setEmployees(freeUsers.data);

            const usersForManagerResponse = await axios.get('http://localhost:32768/api/User/GetUsersForPeopleManager', {
                headers: {
                    Authorization: token
                }
            });
            setManagedEmployees(usersForManagerResponse.data);

            
        } catch (err) {
            setError('Failed to fetch employees');
            console.error(err);
        } finally {
            setLoading(false);
        }
};


// const loggedInResponse = await axios.get('http://localhost:32768/api/User/GetUserByUserName', {
//     headers: {
//         Authorization: token
//     }
// });
// setLoggedInUser(loggedInResponse.data);

// const allUsersResponse = await axios.get('http://localhost:32768/api/User/GetAllUsers', {
//     headers: {
//         Authorization: token
//     }
// });
// const filteredEmployees = allUsersResponse.data.filter(
//     user => user.roleNames.indexOf('Admin') === -1
//         && user.email !== loggedInResponse.data.email
//         && !usersForManagerResponse.data.some(managed => managed.id === user.id
//     ));

// setEmployees(filteredEmployees);