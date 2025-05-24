import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

type ClienteTotal = {
  cliente_nombre: string;
  total: number;
};

function ClienteTotales() {
  const [totales, setTotales] = useState<ClienteTotal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <h2>Total dispersado por cliente</h2>
      <ul>
        {totales.map((cliente) => (
          <li key={cliente.cliente_nombre}>
            {cliente.cliente_nombre}: ${cliente.total.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClienteTotales;
