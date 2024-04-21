import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Dashboard() {
    const [sensorData, setSensorData] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const socket = io('http://localhost:3004');

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            socket.emit('authenticate', { token}); // Autenticar enviando token y email
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
