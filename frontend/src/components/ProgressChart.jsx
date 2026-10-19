import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  RadarController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  RadarController,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const ProgressChart = ({ type = 'line' }) => {
  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Target Study Hours',
        data: [4.0, 4.0, 4.0, 4.5, 4.5, 5.0, 3.5],
        borderColor: 'rgba(156, 163, 175, 0.4)',
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: 'Actual Focused Hours',
        data: [3.5, 4.2, 5.0, 4.8, 3.8, 6.0, 4.5],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const radarData = {
    labels: ['Distributed Systems', 'Machine Learning', 'Compiler Design', 'Cloud Computing', 'Database Systems', 'Algorithms'],
    datasets: [
      {
        label: 'Subject Mastery Level (%)',
        data: [88, 75, 62, 92, 80, 85],
        backgroundColor: 'rgba(139, 92, 246, 0.25)',
        borderColor: '#8b5cf6',
        pointBackgroundColor: '#8b5cf6',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#9ca3af',
          font: { family: 'Plus Jakarta Sans', size: 12 },
        },
      },
    },
    scales: type === 'line' ? {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } }
    } : {
      r: {
        angleLines: { color: 'rgba(255,255,255,0.1)' },
        grid: { color: 'rgba(255,255,255,0.1)' },
        pointLabels: { color: '#9ca3af', font: { size: 11 } },
        ticks: { backdropColor: 'transparent', color: '#9ca3af' }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '280px' }}>
      {type === 'line' ? (
        <Line data={lineData} options={options} />
      ) : (
        <Radar data={radarData} options={options} />
      )}
    </div>
  );
};
