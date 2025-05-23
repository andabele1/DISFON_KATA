import pandas as pd
import os

def cargar_transacciones():
    ruta = os.path.join(os.path.dirname(__file__), '..', 'data', 'transacciones.csv')
    df = pd.read_csv(ruta)
    return df
