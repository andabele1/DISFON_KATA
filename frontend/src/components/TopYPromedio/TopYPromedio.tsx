import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function TopYPromedio() {
  const [top, setTop] = useState(null);
  const [promedio, setPromedio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch para transacciones
    const fetchPromedio = fetch(`${API_URL}/transacciones`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error en transacciones: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const total = data.reduce((sum, t) => sum + t.monto, 0);
        setPromedio((total / data.length).toFixed(2));
      });

    // Fetch para top
    const fetchTop = fetch(`${API_URL}/top`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error en top: ${res.status}`);
        return res.json();
      })
      .then((data) => setTop(data));

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
        {promedio !== null ? `$${promedio}` : "N/A"}
      </p>
      {top ? (
        <p>
          <strong>Top receptor:</strong> {top.cliente_nombre} ($
          {top.total.toLocaleString()})
        </p>
      ) : (
        <p>No hay datos de top receptor.</p>
      )}
    </div>
  );
}

export default TopYPromedio;
