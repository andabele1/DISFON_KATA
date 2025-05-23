def transaccion_a_dict(row):
    return {
        "id_transaccion": row["id_transaccion"],
        "fecha": row["fecha"],
        "cliente_id": row["cliente_id"],
        "cliente_nombre": row["cliente_nombre"],
        "monto": row["monto"],
        "medio_pago": row["medio_pago"]
    }
