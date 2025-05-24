import pandas as pd
import os

def cargar_transacciones():
    ruta = os.path.join(os.path.dirname(__file__), '..', 'data', 'transacciones.csv')
    df = pd.read_csv(ruta)
    return df

# import sqlite3
# import pandas as pd

# DB_PATH = "transacciones.db"

# def cargar_transacciones():
#     conn = sqlite3.connect(DB_PATH)
#     df = pd.read_sql_query("SELECT * FROM transacciones", conn)
#     conn.close()
#     return df
