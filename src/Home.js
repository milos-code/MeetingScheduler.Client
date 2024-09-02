import React, {useEffect, useState} from "react";
import axios from "axios";
import './Home.css';

function Home({ setActiveView }){
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    
    // const [enabled, setEnabled] = useState(false);

    // useEffect(() => {
    //     setEnabled(user?.roleNames?.some(x => x == "Admin"));
    // }, [user]);

    useEffect(() =>{
        const token = sessionStorage.getItem('token');

        if(!token){
            setActiveView('login');//Return to login if no token found
            return;
        }

        axios.get(`http://localhost:32768/api/User/GetUserByUserName`,{
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(err => {
            if(err.response && err.response.status === 401){
                setActiveView('login');
            }else{
                setError('Failed to fetch user data');
                console.error(err);
            }
        });
    }, [setActiveView]);
    
    if(error){
        return <p>{error}</p>
    }

    if(!user){
        return <p>Loading...</p>
    }

    return (
        <div className="home-container">
            <main>
                <h1>Welcome, {user.firstName} {user.lastName}!</h1>
                <p>Date of Birth: {new Date(user.birthDate).toLocaleDateString()}</p>
                <p>Position: {user.position}</p>
                <p>Roles: {user.roleNames.join(', ')}</p>
            </main>
        </div>
    );
}

export default Home;

// <>
        //     {enabled &&
                // this is for when we want to make sure a certian role is logged in to be able to view the page
        //     }
        // </>