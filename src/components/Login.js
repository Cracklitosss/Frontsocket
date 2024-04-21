import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', { email, password });
            if (response.data.token) { // Asumiendo que el token viene en la respuesta
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
