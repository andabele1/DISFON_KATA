import { useEffect, useState } from "react";
import "./MayorPagoPorCliente.css";

// URL base de la API desde variable de entorno
const API_URL = process.env.REACT_APP_API_URL;

// Definición del tipo para representar la información del pago
type Pago = {
  cliente_nombre: string;
  monto: number;
  fecha: string;
  id_transaccion: string;
};

function MayorPagoCliente() {
  // Estado para almacenar los pagos
  const [pagos, setPagos] = useState([] as Pago[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    fetch(`${API_URL}/mayor_pago_por_cliente`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar datos");
        return res.json();
      })
      .then((data) => {
        setPagos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p>Representa el mayor movimiento realizado por cada cliente.</p>
      <table className="tabla">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>ID Transacción</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago, idx) => (
            <tr key={idx}>
              <td>{pago.cliente_nombre}</td>
              <td>${pago.monto.toLocaleString()}</td>
              <td>{pago.fecha}</td>
              <td>{pago.id_transaccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MayorPagoCliente;
