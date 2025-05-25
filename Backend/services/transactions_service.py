from utils.data_loader import cargar_transacciones  # Función que carga los datos desde la fuente (CSV, DB, etc.)
import pandas as pd

# Devuelve todas las transacciones como una lista de diccionarios
def obtener_todas():
    df = cargar_transacciones()
    return df.to_dict(orient="records")

# Calcula el total de montos por cliente
def total_por_cliente():
    df = cargar_transacciones()
    result = df.groupby("cliente_nombre")["monto"].sum().reset_index()
    # Renombra la columna 'monto' a 'total' para mayor claridad en el resultado
    return result.rename(columns={"monto": "total"}).to_dict(orient="records")

# Devuelve los 5 clientes con mayor monto total acumulado
def cliente_top():
    df = cargar_transacciones()
    resumen = df.groupby("cliente_nombre")["monto"].sum().reset_index()
    top5 = resumen.sort_values(by="monto", ascending=False).head(5)
    return top5.to_dict(orient="records")

# Devuelve todas las transacciones realizadas en una fecha específica
def transacciones_por_fecha(fecha):
    df = cargar_transacciones()
    filtrado = df[df["fecha"] == fecha]  # Filtra por la fecha exacta (formato YYYY-MM-DD)
    return filtrado.to_dict(orient="records")

# Calcula el promedio de monto de transacciones por cliente
def promedio_por_cliente():
    df = cargar_transacciones()
    result = df.groupby("cliente_nombre")["monto"].mean().reset_index()
    result["promedio"] = result["monto"].round(2)  # Redondea a 2 decimales
    result = result.drop(columns=["monto"])  # Elimina la columna original de promedio sin redondear
    return result.to_dict(orient="records")

# Devuelve una lista de todas las fechas únicas en las que hay transacciones
def fechas_disponibles():
    df = cargar_transacciones()
    return sorted(df["fecha"].unique().tolist())

# Calcula el total mensual de todas las transacciones (agrupado por mes)
def total_mensual():
    df = cargar_transacciones()
    df["mes"] = df["fecha"].str.slice(0, 7)  # Extrae el año y mes (formato YYYY-MM)
    resumen = df.groupby("mes")["monto"].sum().reset_index()
    resumen = resumen.rename(columns={"monto": "total"})
    resumen = resumen.sort_values("mes", ascending=True)  # Orden cronológico
    return resumen.to_dict(orient="records")

# Devuelve la transacción de mayor monto para cada cliente
def mayor_pago_por_cliente():
    df = cargar_transacciones()
    idx = df.groupby("cliente_nombre")["monto"].idxmax()  # Índice del mayor monto por cliente
    mayores = df.loc[idx].copy()  # Selecciona esas transacciones
    mayores = mayores.sort_values(by="monto", ascending=False)  # Ordena de mayor a menor
    resultados = mayores[["cliente_nombre", "monto", "fecha", "id_transaccion"]].to_dict(orient="records")
    return resultados
