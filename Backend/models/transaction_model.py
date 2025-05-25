# Convierte una fila de un DataFrame (tipo Series) a un diccionario con claves claras
def transaccion_a_dict(row):
    return {
        "id_transaccion": row["id_transaccion"],  # ID único de la transacción
        "fecha": row["fecha"],                    # Fecha en formato YYYY-MM-DD
        "cliente_id": row["cliente_id"],          # ID único del cliente
        "cliente_nombre": row["cliente_nombre"],  # Nombre del cliente
        "monto": row["monto"],                    # Monto de la transacción
        "medio_pago": row["medio_pago"]           # Medio de pago (ej: efectivo, tarjeta, etc.)
    }
