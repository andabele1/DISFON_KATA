import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function VisualizarTransacciones({ onBack }) {
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Paginación
  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 15;

  // Orden de fechas: 'desc' = más reciente primero, 'asc' = más antigua primero
  const [ordenFecha, setOrdenFecha] = useState("desc");

  useEffect(() => {
    fetch(`${API_URL}/transacciones`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar");
        return res.json();
      })
      .then((data) => {
        setTransacciones(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Ordenar transacciones según ordenFecha
  const transaccionesOrdenadas = [...transacciones].sort((a, b) => {
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    return ordenFecha === "desc"
      ? fechaB - fechaA
      : fechaA - fechaB;
  });

  const totalPaginas = Math.ceil(transaccionesOrdenadas.length / itemsPorPagina);

  const transaccionesPaginadas = transaccionesOrdenadas.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina
  );

  // Cuando cambie el orden, reseteamos a la página 1 para evitar errores
  const handleChangeOrden = (e) => {
    setOrdenFecha(e.target.value);
    setPagina(1);
  };

  if (loading) return <p>Cargando transacciones...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <button onClick={onBack} style={{ marginBottom: "1rem" }}>
        ← Volver
      </button>
      <h2>Transacciones</h2>

      {/* Selector de orden */}
      <label>
        Ordenar por fecha:{" "}
        <select value={ordenFecha} onChange={handleChangeOrden}>
          <option value="desc">Más recientes primero</option>
          <option value="asc">Más antiguas primero</option>
        </select>
      </label>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ flex: 1, width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th>ID</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transaccionesPaginadas.map((t) => (
            <tr key={t.id_transaccion}>
              <td>{t.id_transaccion}</td>
              <td>{t.cliente_nombre}</td>
              <td>${t.monto.toLocaleString()}</td>
              <td>{t.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginador */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <button
          onClick={() => setPagina((p) => Math.max(p - 1, 1))}
          disabled={pagina === 1}
        >
          ← Anterior
        </button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <button
          onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
          disabled={pagina === totalPaginas}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}

export default VisualizarTransacciones;
