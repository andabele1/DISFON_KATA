import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function TransaccionesPorFecha() {
  const [fecha, setFecha] = useState("2025-05-01");
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/por_fecha/${fecha}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la respuesta: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTransacciones(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setTransacciones([]);
        setLoading(false);
      });
  }, [fecha]);

  return (
    <div>
      <h2>Fondos enviados por fecha</h2>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      {loading && <p>Cargando transacciones...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {transacciones.length > 0 ? (
            transacciones.map((t) => (
              <li key={t.id_transaccion}>
                {t.cliente_nombre}: ${t.monto.toLocaleString()}
              </li>
            ))
          ) : (
            <p>No hay transacciones para esta fecha.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default TransaccionesPorFecha;
