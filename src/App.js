import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js

const MyChartComponent = () => {
  const [data, setData] = useState({ x: [], y: [] });
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseX = await fetch('https://retoolapi.dev/o5zMs5/data');
        const responseY = await fetch('https://retoolapi.dev/gDa8uC/data');
        const dataX = await responseX.json();
        const dataY = await responseY.json();

        // Assuming dataX and dataY are arrays of values
        setData({ x: dataX.slice(0, 50), y: dataY.slice(0, 50) });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Render chart when data changes
    if (data.x.length > 0 && data.y.length > 0) {
      if (chartRef.current) {
        // Update existing chart data
        chartRef.current.data.labels = data.x;
        chartRef.current.data.datasets[0].data = data.y;
        chartRef.current.update();
      } else {
        // Create new chart
        const ctx = document.getElementById('myChart');
        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.x,
            datasets: [{
              label: 'Data',
              data: data.y,
              borderColor: 'blue',
              borderWidth: 1,
              fill: false
            }]
          },
          options: {
            // Add options here if needed
          }
        });
      }
    }
  }, [data]);

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default MyChartComponent;
