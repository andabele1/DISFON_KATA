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
import './MostrarGrafica.css'; // Estilos separados

// Registro de los elementos necesarios para la gráfica de barras
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Tipo para los datos que vienen del backend
interface DatosMensuales {
  mes: string;   // formato "YYYY-MM"
  total: number; // total dispersado en ese mes
}

// URL base para las peticiones a la API
const API_URL = process.env.REACT_APP_API_URL;

// Función auxiliar para convertir "2024-01" en "Enero", etc.
const convertirMes = (fecha: string) => {
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const mesNum = parseInt(fecha.split('-')[1], 10);
  return meses[mesNum - 1] || fecha;
};

// Colores personalizados para las barras del gráfico
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

  // useEffect para obtener los datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/totales_mensuales`);
        setDatos(response.data); // Guardamos los datos
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      } finally {
        setCargando(false); // Ya no estamos cargando, pase lo que pase
      }
    };

    fetchData();
  }, []);

  // Mensaje si aún se está cargando
  if (cargando) return <p>Cargando...</p>;

  // Mensaje si no hay datos
  if (datos.length === 0) return <p>No hay datos para mostrar</p>;

  // Etiquetas (meses) y colores para el gráfico
  const labels = datos.map(d => convertirMes(d.mes));
  const backgroundColors = datos.map((_, i) => colores[i % colores.length]);

  // Configuración de datos del gráfico
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Visualización de Totales Mensuales',
        data: datos.map(d => d.total),
        backgroundColor: backgroundColors,
        borderColor: backgroundColors.map(c => c.replace('0.7', '1')),
        borderWidth: 1,
      },
    ],
  };

  // Opciones de visualización del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Total: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          font: { size: 14 },
        },
        grid: { color: '#ffffff' },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ffffff',
          font: { size: 14 },
        },
        grid: { color: '#ffffff' },
      },
    },
  };

  return (
    <div>
      <div>
        <h2 className="title">Totales Mensuales Dispersados</h2>
        <p className="subtitle">
          Visualización de los totales dispersados por mes.
        </p>
      </div>
      <div className="grafica-contenedor">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default MostrarGrafica;
