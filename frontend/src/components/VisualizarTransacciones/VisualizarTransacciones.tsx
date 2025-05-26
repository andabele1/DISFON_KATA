import React, { useEffect, useState } from "react";
import "./VisualizarTransacciones.css"; // Importa el CSS para estilos

// URL base de la API desde variable de entorno
const API_URL = process.env.REACT_APP_API_URL;

// Definición del tipo para representar la información de una transacción
type Transaccion = {
  id_transaccion: number;
  cliente_nombre: string;
  monto: number;
  fecha: string;
};

// Componente VisualizarTransacciones
type Props = {
  onBack?: () => void;
};

function VisualizarTransacciones({ onBack }: Props) {
  const [transacciones, setTransacciones] = useState([] as Transaccion[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para manejar la paginación
  const [pagina, setPagina] = useState(1);
  const itemsPorPagina = 15;

  // Estado para manejar el orden de las transacciones
  const [ordenFecha, setOrdenFecha] = useState("desc" as "asc" | "desc");

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    fetch(`${API_URL}/transacciones`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar transacciones.");
        return res.json();
      })
      .then((data) => {
        console.log("Transacciones recibidas:", data);
        setTransacciones(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  // Ordenar por fecha ascendente o descendente
  const transaccionesOrdenadas = [...transacciones].sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime();
    const fechaB = new Date(b.fecha).getTime();
    return ordenFecha === "desc" ? fechaB - fechaA : fechaA - fechaB;
  });

  // Calcular el total de páginas
  const totalPaginas = Math.ceil(transaccionesOrdenadas.length / itemsPorPagina);

  // Obtener las transacciones para la página actual
  const transaccionesPaginadas = transaccionesOrdenadas.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina
  );

  // Manejar el cambio de orden al seleccionar en el dropdown
  const handleChangeOrden = (event: any) => {
    const orden = event.target.value;
    if (orden === "asc" || orden === "desc") {
      setOrdenFecha(orden);
      setPagina(1);
    }
  };

  // Renderizado condicional mientras se cargan los datos o si hubo un error
  if (loading) return <p>Cargando transacciones...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <p>Resumen de cada transaccione hecha, modifique el orden de la vista si desea ver desde las mas antiguas o las mas recientes</p>
      {/* Selector de orden */}
      <label className="title-h2">
        Ordenar por fecha:{" "}
        <select value={ordenFecha} onChange={handleChangeOrden}>
          <option value="desc">Más recientes primero</option>
          <option value="asc">Más antiguas primero</option>
        </select>
      </label>

      {/* Tabla de transacciones */}
      <table className="tabla" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
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

      {/* Paginación */}
      <div className="paginacion">
        <button onClick={() => setPagina((p) => Math.max(p - 1, 1))} disabled={pagina === 1}>
          ← Anterior
        </button>
        <span className="title-h2">
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
