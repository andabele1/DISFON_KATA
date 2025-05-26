import { useEffect, useState } from "react";
import "./TransaccionesPorFecha.css";

// URL base de la API desde variable de entorno
const API_URL = process.env.REACT_APP_API_URL;

// Definición del tipo para representar la información de una transacción
type Transaccion = {
  id_transaccion: number;
  cliente_nombre: string;
  monto: number;
};

function TransaccionesPorFecha() {
  const [fecha, setFecha] = useState("2025-01-01"); // Fecha inicial por defecto
  const [transacciones, setTransacciones] = useState([] as Transaccion[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Llama al backend cada vez que cambia la fecha
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
      <p>Muestra las transacciones realizadas en la fecha seleccionada, seleccione un fecha en el calendario.</p>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="input-fecha"
      />

      {loading && <p>Cargando transacciones...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && transacciones.length === 0 && (
        <p>No hay transacciones para esta fecha.</p>
      )}

      {!loading && !error && transacciones.length > 0 && (
        <div>
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
