import  sqlite3
import csv
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch

processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")

DB_PATH="" # to be replaced
CSV_PATH="" # to be replaced

def init_db():
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()
    cursor.executescript(open("schema.sql").read())
    connection.commit()
    connection.close()
  
  
# CREATE TABLE IF NOT EXISTS products (
#     id TEXT PRIMARY KEY,
#     name TEXT NOT NULL,
#     category TEXT,
#     image_url TEXT,
#     local_path TEXT,
#     embedding BLOB
# );  
def load_CSV():
    connection = sqlite3.connect(DB_PATH)
    cursor = connection.cursor()
    with open(CSV_PATH, "r", newline="", encoding="utf-8") as f:
        reader=csv.DictReader(f)
        for row in reader:
            cursor.execute("""
                    INSERT OR REPLACE INTO products
                (id, name, category, local_path)
                VALUES (?, ?, ?, ?)
                           """, (
                               row["id"],
                               row["name"],
                               row["category"],
                               row["local_path"]
                           ))
        connection.commit()
        connection.close()
        
def embed_and_store():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, local_path FROM products")
    rows = cur.fetchall()
    for prod_id, img_path in rows:
        image = Image.open(img_path)
        inputs = processor(images=image, return_tensors="pt", padding=True)
        with torch.no_grad():
            embedding = model.get_image_features(**inputs).numpy()
        # Flatten and convert to bytes
        blob = embedding.tobytes()
        cur.execute("UPDATE products SET embedding = ? WHERE id = ?", (blob, prod_id))
    conn.commit()
    conn.close()

            
if __name__=="__main__":
    init_db()
    load_CSV()
    embed_and_store()