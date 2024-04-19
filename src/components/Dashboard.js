import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Dashboard() {
    const [sensorData, setSensorData] = useState(null); // Cambiar a null para iniciar sin datos

    useEffect(() => {
        const socket = io('https://websocketserver-l5ok.onrender.com');
        socket.on('updateSensorData', data => {
            console.log('Datos de sensor actualizados recibidos:', data);
            setSensorData(data); // Establecer directamente el nuevo dato
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div>
            <h1>Sensor Data</h1>
            {sensorData ? ( // Comprobar si sensorData no es null antes de renderizar
                <div>
                    <pre>{JSON.stringify(sensorData, null, 2)}</pre>
                </div>
            ) : (
                <p>No data received yet.</p> // Mostrar un mensaje si aún no se han recibido datos
            )}
        </div>
    );
}

export default Dashboard;
