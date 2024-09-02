import React, {useState} from "react";
import axios from "axios";
import { Input, Label } from "@fluentui/react-components";
import './Login.css';

function Login({ setActiveView  }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:32768/api/Authentication/LogIn', {
                email,
                password
            });

            console.log('Login successful:', response.data);

            sessionStorage.setItem('token', response.data.token); // Store the token

            setActiveView('home'); // Navigate to home view
        } catch (err) {
            setError('Invalid email or password');
            console.error(err);
        }
    };

    return(
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="email">Email:</Label>
                    <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            border: '1px solid black'
                          }} 
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password:</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            border: '1px solid black'
                          }}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;