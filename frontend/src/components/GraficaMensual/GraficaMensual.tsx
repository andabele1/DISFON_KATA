import { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer
} from "recharts";

import "./GraficaMensual.css";

type GraficaMensualProps = {
  onMesClick: (mes: string) => void;
};

type GraficaMensualData = {
  name: string;
  value: number;
};

const API_URL = process.env.REACT_APP_API_URL;
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#aa66cc",
  "#ff6666",
  "#66cc99",
];

function GraficaMensual({ onMesClick }: GraficaMensualProps) {
  const [data, setData] = useState([] as GraficaMensualData[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/totales_mensuales`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los datos del servidor.");
        }
        return res.json();
      })
      .then((data) => {
        const formateado = data.map((item: any) => ({
          name: item.mes,
          value: item.total,
        }));
        setData(formateado);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handlePieClick = (data: GraficaMensualData) => {
    onMesClick(data.name);
  };

  return (
    <div className="grafica-container">
      <h2 className="grafica-title">Total Dispersado Mensualmente</h2>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && data.length === 0 && (
        <p>No hay datos disponibles.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              paddingAngle={3}
              label
              onClick={handlePieClick}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default GraficaMensual;
