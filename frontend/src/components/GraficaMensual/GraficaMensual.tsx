import { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,

} from "recharts";
import "./GraficaMensual.css";

const API_URL = process.env.REACT_APP_API_URL;

interface DatoMensual {
  mes: string;
  total: number;
}

interface DatoDetalle {
  categoria: string;
  monto: number;
}

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A28CFE", "#FF6699", "#33CCFF", "#66FF66",
  "#FF6666", "#FF9933", "#CCCC00", "#66CCCC"
];

function GraficoMensual() {
  const [data, setData] = useState([] as Array<DatoMensual>);
  const [detalle, setDetalle] = useState([] as Array<DatoDetalle>); 
  const [mesSeleccionado, setMesSeleccionado] = useState(null); 

  useEffect(() => {
    fetch(`${API_URL}/totales_mensuales`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Error al cargar los datos:", err));
  }, []);

  const handleClick = (entry: DatoMensual) => {
    setMesSeleccionado(entry.mes);

    fetch(`${API_URL}/detalle_mensual?mes=${entry.mes}`)
      .then((res) => res.json())
      .then(setDetalle)
      .catch((err) =>
        console.error("Error al cargar detalle del mes:", err)
      );
  };

  const handleVolver = () => {
    setDetalle(null);
    setMesSeleccionado(null);
  };

  return (
    <div className="grafico-completo">
      {!detalle ? (
        <>
          <h2 className="grafico-mensual-title">Dispersión de Fondos por Mes</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="mes"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={3}
                isAnimationActive
                onClick={(e) => handleClick(e.payload)}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </>
      ) : (
        <>
          <h2 className="grafico-mensual-title">Detalle de {mesSeleccionado}</h2>
          <button className="btn-volver" onClick={handleVolver}>
            ← Volver
          </button>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={detalle}
                dataKey="monto"
                nameKey="categoria"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={3}
              >
                {detalle.map((_, index) => (
                  <Cell
                    key={`cell-detalle-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default GraficoMensual;
