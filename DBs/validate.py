import sqlite3
import numpy as np

DB_PATH="C:\\Users\\aksha\\Desktop\\home\\products.db"


conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()
cur.execute("SELECT id, name, embedding FROM products LIMIT 5")
for row in cur.fetchall():
    prod_id, name, blob = row
    if blob:
        emb = np.frombuffer(blob, dtype=np.float32)
        print(f"{prod_id} ({name}) - embedding shape: {emb.shape}")
    else:
        print(f"{prod_id} ({name}) - no embedding")
conn.close()