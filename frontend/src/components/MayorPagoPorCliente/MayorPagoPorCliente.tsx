import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function MayorPagoCliente() {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <h2>Mayor Pago por Cliente</h2>
            <table className="tabla" border={1} cellPadding={8} cellSpacing={0} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#eee" }}>
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
