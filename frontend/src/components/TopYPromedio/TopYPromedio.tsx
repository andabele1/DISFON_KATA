import { useEffect, useState } from "react";
import "./TopYPromedio.css";

const API_URL = process.env.REACT_APP_API_URL;

type TopReceptor = {
  cliente_nombre: string;
  total: number;
};

function TopYPromedio() {
  // const [top, setTop] = useState<TopReceptor | null>(null);
  const [top5, setTop5] = useState([] as TopReceptor[]);
  const [promedio, setPromedio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch para transacciones para calcular promedio
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
        const total = data.reduce((sum, t) => sum + t.monto, 0);
        setPromedio((total / data.length).toFixed(2));
      });

    // Fetch para top (ideal que tu API /top devuelva top 5)
    const fetchTop = fetch(`${API_URL}/top`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error en top: ${res.status}`);
        return res.json();
      })
      .then((data: TopReceptor[]) => {
        if (data.length === 0) {
          // setTop(null);
          setTop5([]);
        } else {
          // setTop(data[0]);
          setTop5(data);
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
      <h2>Análisis: Top receptores y promedio</h2>
      <p>
        <strong>Promedio dispersado por transacción:</strong>{" "}
        {promedio !== null ? `$${promedio}` : "No disponible"}
      </p>
      {top5.length > 0 ? (
        <p>
          <strong>Top receptor:</strong> {top5[0].cliente_nombre} ($
          {top5[0].total.toLocaleString()})
        </p>
      ) : (
        <p>No hay datos de top receptor.</p>
      )}

      {top5.length > 0 && (
        <>
          <h3>Top 5 receptores</h3>
          <table className="tabla">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Cliente</th>
                <th>Total recibido</th>
              </tr>
            </thead>
            <tbody>
              {top5.map((r, index) => (
                <tr key={r.cliente_nombre}>
                  <td>{index + 1}</td>
                  <td>{r.cliente_nombre}</td>
                  <td>${r.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );

}

export default TopYPromedio;
