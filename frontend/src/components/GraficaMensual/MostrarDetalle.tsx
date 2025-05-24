import React, { useEffect, useState } from "react";

interface DetalleCategoria {
  categoria: string;
  total: number;
}
const API_URL = process.env.REACT_APP_API_URL;

function ModalDetalle({ mes, onClose }: { mes: string; onClose: () => void }) {
  const [detalle, setDetalle] = useState([] as Array<DetalleCategoria>);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mes) return;
    setLoading(true);
    fetch(`${API_URL}/detalle_mensual?mes=${mes}`)
      .then(res => res.json())
      .then(data => setDetalle(data))
      .finally(() => setLoading(false));
  }, [mes]);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Detalle para {mes}</h3>
        {loading && <p>Cargando...</p>}
        {!loading && detalle.length === 0 && <p>No hay datos para este mes.</p>}
        {!loading && detalle.length > 0 && (
          <table>
            <thead>
              <tr><th>Categoria</th><th>Total</th></tr>
            </thead>
            <tbody>
              {detalle.map(({ categoria, total }) => (
                <tr key={categoria}>
                  <td>{categoria}</td>
                  <td>${total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ModalDetalle;