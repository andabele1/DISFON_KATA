import os
import pandas as pd
import sqlite3

# Obtener la ruta absoluta a este archivo
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Ruta al CSV
csv_path = os.path.join(BASE_DIR, "data", "transacciones.csv")

# Verificar si el archivo existe
if not os.path.exists(csv_path):
    raise FileNotFoundError(f"No se encontró el archivo CSV en: {csv_path}")

# Cargar el CSV en un DataFrame
df = pd.read_csv(csv_path)

# Crear o conectar a la base de datos SQLite
db_path = os.path.join(BASE_DIR, "transacciones.db")
conn = sqlite3.connect(db_path)

# Escribir los datos en una tabla llamada "transacciones"
df.to_sql("transacciones", conn, if_exists="replace", index=False)

conn.close()
print("✅ Migración completada correctamente.")
