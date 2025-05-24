import { useEffect, useState } from "react";

function ClienteTotales() {
  const [totales, setTotales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/totales")
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
