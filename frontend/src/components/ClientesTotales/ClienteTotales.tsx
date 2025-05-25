import { useEffect, useState } from "react";
import "./ClientesTotales.css";

// URL base de la API desde variable de entorno
const API_URL = process.env.REACT_APP_API_URL;

// Definición del tipo para representar la información total por cliente
type ClienteTotal = {
  cliente_nombre: string;
  total: number;
};

function ClienteTotales() {
  // Estado para almacenar los datos de totales por cliente
  const [totales, setTotales] = useState([] as ClienteTotal[]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    fetch(`${API_URL}/totales`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la respuesta: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTotales(data); // Guardamos los datos en el estado
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message); // Capturamos cualquier error
        setLoading(false);
      });
  }, []);

  // Renderizado condicional mientras se cargan los datos o si hubo un error
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos: {error}</p>;

  return (
    <div>
      <p>Representa la cantidad total dispersada por cada cliente.</p>
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
