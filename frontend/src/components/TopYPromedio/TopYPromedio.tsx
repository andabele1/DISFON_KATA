import { useEffect, useState } from "react";
import "./TopYPromedio.css";

// URL base de la API desde las variables de entorno
const API_URL = process.env.REACT_APP_API_URL;

// Tipo para los datos de receptores (top)
type TopReceptor = {
  cliente_nombre: string;
  monto: number;
};

function TopYPromedio() {
  const [top5, setTop5] = useState([] as TopReceptor[]);
  const [promedio, setPromedio] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Al montar el componente, se hacen dos fetch: uno para el promedio y otro para el top
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Obtener todas las transacciones para calcular el promedio
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
        // Calcular el promedio de los montos
        const montoTotal = data.reduce((sum, t) => sum + t.monto, 0);
        setPromedio((montoTotal / data.length).toFixed(2)); // promedio con 2 decimales
      });

    // Obtener el top 5 de receptores
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

    // Ejecutar ambos fetch en paralelo
    Promise.all([fetchPromedio, fetchTop])
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Render: cargando
  if (loading) return <p>Cargando análisis...</p>;

  // Render: error
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div>
      <p className="subtitle">
        <strong>Promedio dispersado por transacción:</strong>{" "}
        {promedio !== null ? `$${promedio}` : "No disponible"}
      </p>

      {top5.length > 1 && (
        <>
          <h3 className="subtitle">Top 5 receptores</h3>
          <table className="tabla">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Cliente</th>
                <th>Monto recibido</th>
              </tr>
            </thead>
            <tbody>
              {top5.map((r, index) => {
                const montoNum = Number(r.monto);
                return (
                  <tr key={r.cliente_nombre}>
                    <td>{index + 1}</td>
                    <td>{r.cliente_nombre}</td>
                    <td>
                      {!isNaN(montoNum)
                        ? `$${montoNum.toLocaleString()}`
                        : `N/A (${r.monto})`}
                    </td>
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
