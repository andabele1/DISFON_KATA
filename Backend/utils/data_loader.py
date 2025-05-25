import pandas as pd
import os

# Función para cargar las transacciones desde un archivo CSV
def cargar_transacciones():
    # Construye la ruta al archivo 'transacciones.csv' ubicado en la carpeta 'data' (nivel superior al actual)
    ruta = os.path.join(os.path.dirname(__file__), '..', 'data', 'transacciones.csv')
    # Lee el archivo CSV y devuelve un DataFrame de pandas con los datos
    df = pd.read_csv(ruta)
    return df

# Código comentado para cargar las transacciones desde una base de datos SQLite
# import sqlite3
# import pandas as pd

# DB_PATH = "transacciones.db"

# def cargar_transacciones():
#     # Abre una conexión a la base de datos SQLite
#     conn = sqlite3.connect(DB_PATH)
#     # Ejecuta una consulta SQL para traer todas las filas de la tabla 'transacciones'
#     df = pd.read_sql_query("SELECT * FROM transacciones", conn)
#     # Cierra la conexión a la base de datos
#     conn.close()
#     return df
