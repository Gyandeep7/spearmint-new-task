import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ChartComponent() {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  useEffect(() => {
    fetch('https://retoolapi.dev/o5zMs5/data')
      .then(response => response.json())
      .then(data => {
        setXData(data.slice(0, 50));
      })
      .catch(error => console.error('Error fetching x-axis data:', error));

    fetch('https://retoolapi.dev/gDa8uC/data')
      .then(response => response.json())
      .then(data => {
        setYData(data.slice(0, 50));
      })
      .catch(error => console.error('Error fetching y-axis data:', error));
  }, []);

  
const combinedData = xData.slice(0, 50).map((item, index) => ({
  x: item.Label, 
  y: item.RandomNumber, 
}));


  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartComponent;
