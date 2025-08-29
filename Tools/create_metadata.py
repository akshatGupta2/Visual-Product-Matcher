import csv
import os
from pathlib import Path

csv_path=Path("../products.csv")
img_dir=Path("../assets/imgs")

with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer=csv.writer(f)
    writer.writerow(["id","name","category","local_path"])
    for img_file in img_dir.glob("*.jpg"):
        prod_id = img_file.stem
        writer.writerow([
            prod_id,
            f"Product {prod_id}",
            "Sports Equipment", 
            str(img_file)
        ])