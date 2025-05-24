import { useEffect, useState } from "react";
import "./TransaccionesPorFecha.css";

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
        if (!res.ok) throw new Error(`Error en la respuesta: ${res.status}`);
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
      <h2 className = "title">Fondos enviados por fecha</h2>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />

      {loading && <p>Cargando transacciones...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && transacciones.length === 0 && (
        <p>No hay transacciones para esta fecha.</p>
      )}

      {!loading && !error && transacciones.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {transacciones.map((t) => (
                <tr key={t.id_transaccion}>
                  <td>{t.id_transaccion}</td>
                  <td>{t.cliente_nombre}</td>
                  <td>${t.monto.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransaccionesPorFecha;
