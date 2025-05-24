import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './MostrarGrafica.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface DatosMensuales {
  mes: string;
  total: number;
}

const API_URL = process.env.REACT_APP_API_URL;

const convertirMes = (fecha: string) => {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const mesNum = parseInt(fecha.split('-')[1], 10);
  return meses[mesNum - 1] || fecha;
};

const colores = [
  'rgba(255, 70, 90, 0.9)',
  'rgba(30, 144, 255, 0.9)',
  'rgba(255, 215, 0, 0.9)',
  'rgba(0, 206, 209, 0.9)',
  'rgba(138, 43, 226, 0.9)',
  'rgba(255, 140, 0, 0.9)',
  'rgba(220, 20, 60, 0.9)',
  'rgba(65, 105, 225, 0.9)',
  'rgba(255, 20, 147, 0.9)',
  'rgba(50, 205, 50, 0.9)',
  'rgba(255, 69, 0, 0.9)',
  'rgba(60, 179, 113, 0.9)',
];


function MostrarGrafica() {
  const [datos, setDatos] = useState([] as DatosMensuales[]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/totales_mensuales`);
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  if (cargando) return <p>Cargando...</p>;
  if (datos.length === 0) return <p>No hay datos para mostrar</p>;

  const labels = datos.map(d => convertirMes(d.mes));

  const backgroundColors = datos.map((_, i) => colores[i % colores.length]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Vizualización de Totales Mensuales',
        data: datos.map(d => d.total),
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(c => c.replace('0.7', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `Total: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 14,
          },
        },
        grid: {
          color: '#ffffff',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff',
          font: {
            size: 14,
          },
        },
        grid: {
          color: '#ffffff',
        },
      },
    },
  };


  return (
    <div>
      <div>
        <h2 className="title">Totales Mensuales</h2>
      </div>
      <div className="w-full max-w-4xl mx-auto" style={{ height: 700, PaddingLeft: 150 }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>

  );
};

export default MostrarGrafica;
