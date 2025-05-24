from utils.data_loader import cargar_transacciones
import pandas as pd

def obtener_todas():
    df = cargar_transacciones()
    return df.to_dict(orient="records")

def total_por_cliente():
    df = cargar_transacciones()
    result = df.groupby("cliente_nombre")["monto"].sum().reset_index()
    return result.rename(columns={"monto": "total"}).to_dict(orient="records")

def cliente_top():
    df = cargar_transacciones()
    resumen = df.groupby("cliente_nombre")["monto"].sum().reset_index()
    top = resumen.sort_values(by="monto", ascending=False).iloc[0]
    return {"cliente_nombre": top["cliente_nombre"], "total": top["monto"]}

def transacciones_por_fecha(fecha):
    df = cargar_transacciones()
    filtrado = df[df["fecha"] == fecha]
    return filtrado.to_dict(orient="records")

def transacciones_por_fecha_agrupadas():
    df = cargar_transacciones()

    resultado = []

    for fecha, grupo in df.groupby("fecha"):
        resultado.append({
            "fecha": fecha,
            "cantidad_transacciones": len(grupo),
            "transacciones": grupo.to_dict(orient="records")
        })

    resultado.sort(key=lambda x: x["fecha"])

    return resultado

def promedio_por_cliente():
    df = cargar_transacciones()
    result = df.groupby("cliente_nombre")["monto"].mean().reset_index()
    result["promedio"] = result["monto"].round(2)
    result = result.drop(columns=["monto"])
    return result.to_dict(orient="records")

def fechas_disponibles():
    df = cargar_transacciones()
    return sorted(df["fecha"].unique().tolist())

def total_mensual():
    df = cargar_transacciones()
    df["mes"] = df["fecha"].str[:7] 
    resumen = df.groupby("mes")["monto"].sum().reset_index()
    resumen = resumen.rename(columns={"monto": "total"})
    resumen = resumen.sort_values("mes", ascending=True)
    return resumen.to_dict(orient="records")

def detalle_por_mes(nombre_mes):
    df = cargar_transacciones()

    # Asegúrate de convertir la columna 'fecha' a datetime si no lo está
    df["fecha"] = pd.to_datetime(df["fecha"])

    # Crear columna con nombre del mes en español
    meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
    df["mes_nombre"] = df["fecha"].dt.month.apply(lambda x: meses[x - 1])

    # Filtrar por el mes recibido
    df_filtrado = df[df["mes_nombre"].str.lower() == nombre_mes.lower()]

    if df_filtrado.empty:
        return []

    # Agrupar por categoría (puedes cambiar por 'concepto' si tu CSV usa eso)
    if "categoria" in df_filtrado.columns:
        agrupado = df_filtrado.groupby("categoria")["monto"].sum().reset_index()
    elif "concepto" in df_filtrado.columns:
        agrupado = df_filtrado.groupby("concepto")["monto"].sum().reset_index()
        agrupado.rename(columns={"concepto": "categoria"}, inplace=True)
    else:
        raise ValueError("No se encontró columna 'categoria' o 'concepto' en los datos")

    agrupado = agrupado.rename(columns={"monto": "total"})

    return agrupado.to_dict(orient="records")
