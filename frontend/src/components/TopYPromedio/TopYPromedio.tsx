import { useEffect, useState } from "react";
import "./TopYPromedio.css";

const API_URL = process.env.REACT_APP_API_URL;

type TopReceptor = {
  cliente_nombre: string;
  monto: number;
};

function TopYPromedio() {
  const [top5, setTop5] = useState<TopReceptor[]>([]);
  const [promedio, setPromedio] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchPromedio = fetch(`${API_URL}/transacciones`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error en transacciones: ${res.status}`);
        return res.json();
      })
      .then((data: { monto: number }[]) => {
        if (data.length === 0) {
          setPromedio(null);
          return;
        }
        const monto = data.reduce((sum, t) => sum + t.monto, 0);
        setPromedio((monto / data.length).toFixed(2));
      });

    const fetchTop = fetch(`${API_URL}/top`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error en top: ${res.status}`);
        return res.json();
      })
      .then((data: TopReceptor[] | TopReceptor) => {
        if (Array.isArray(data)) {
          setTop5(data);
        } else if (data) {
          setTop5([data]);
        } else {
          setTop5([]);
        }
      });


    Promise.all([fetchPromedio, fetchTop])
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando análisis...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2 className = "title">Análisis: Top receptores y promedio</h2>
      <p className="title-h2">
        <strong>Promedio dispersado por transacción:</strong>{" "}
        {promedio !== null ? `$${promedio}` : "No disponible"}
      </p>

      {top5.length > 1 && (
        <>
          <h3 className = "title-h2">Top 5 receptores</h3>
          <table className="tabla">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Cliente</th>
                <th>monto recibido</th>
              </tr>
            </thead>
            <tbody>
              {top5.map((r, index) => {
                const montoNum = Number(r.monto);
                return (
                  <tr key={r.cliente_nombre}>
                    <td>{index + 1}</td>
                    <td>{r.cliente_nombre}</td>
                    <td>{!isNaN(montoNum) ? `$${montoNum.toLocaleString()}` : `N/A (${r.monto})`}</td>
                  </tr>
                );
              })}

            </tbody>
          </table>

        </>
      )}
    </div>
  );
}

export default TopYPromedio;
