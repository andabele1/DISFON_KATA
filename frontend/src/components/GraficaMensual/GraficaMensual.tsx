import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "./GraficaMensual.css";
import ModalDetalle from "./MostrarDetalle.tsx";

const API_URL = process.env.REACT_APP_API_URL;

interface DatoMensual {
  mes: string;
  total: number;
}

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A28CFE", "#FF6699", "#33CCFF", "#66FF66",
  "#FF6666", "#FF9933", "#CCCC00", "#66CCCC"
];

function GraficoMensual() {
const [data, setData] = useState([] as Array<DatoMensual>);
  const [mesSeleccionado, setMesSeleccionado] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/totales_mensuales`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="grafico-completo">
        <h2 className="grafico-mensual-title">Dispersión de Fondos por Mes</h2>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="mes"
              cx="50%"
              cy="50%"
              outerRadius={300}
              innerRadius={120}
              paddingAngle={3}
              isAnimationActive
              onClick={(e) => setMesSeleccionado(e.payload.mes)}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {mesSeleccionado && (
        <ModalDetalle mes={mesSeleccionado} onClose={() => setMesSeleccionado(null)} />
      )}
    </>
  );
}


export default GraficoMensual;
