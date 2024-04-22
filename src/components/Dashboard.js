import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Dashboard() {
    const [sensorData, setSensorData] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        const token = localStorage.getItem('token');
        const socket = io('http://52.20.195.195');

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            socket.emit('authenticate', { token });
        });

        socket.on('updateSensorDataSpecific', data => {
            console.log('Datos de sensor específicos actualizados recibidos:', data);
            setSensorData(data);
        });

        return () => {
            console.log('Disconnecting from WebSocket server');
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Sensor Data</h1>
            {user ? (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>IdEsp: {user.IdEsp}</p>
                    <p>Ocupación: {user.ocupacion}</p>
                    <p>Estado: {user.estado}</p>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
            {sensorData ? (
                <div>
                    <pre>{JSON.stringify(sensorData, null, 2)}</pre>
                </div>
            ) : (
                <p>No data received yet.</p>
            )}
        </div>
    );
}

export default Dashboard;
