import { useEffect, useState } from "react";
import "./ClientesTotales.css";

const API_URL = process.env.REACT_APP_API_URL;

type ClienteTotal = {
  cliente_nombre: string;
  total: number;
};

function ClienteTotales() {
  const [totales, setTotales] = useState([] as ClienteTotal[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/totales`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la respuesta: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTotales(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos: {error}</p>;

  return (
    <div>
      <h2 className="title">Total dispersado por cliente</h2>
      <table className="tabla-clientes">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total Dispersado</th>
          </tr>
        </thead>
        <tbody>
          {totales.map((cliente) => (
            <tr key={cliente.cliente_nombre}>
              <td>{cliente.cliente_nombre}</td>
              <td>${cliente.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClienteTotales;
