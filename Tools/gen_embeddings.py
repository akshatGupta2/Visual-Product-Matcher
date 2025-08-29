from transformers import CLIPProcessor, CLIPModel
import torch, pandas as pd
from PIL import Image

processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")

df = pd.read_csv("../products.csv")
embeddings = []
for img_path in df["local_path"]:
    image = Image.open(img_path)
    inputs = processor(images=image, return_tensors="pt", padding=True)
    with torch.no_grad():
        embedding = model.get_image_features(**inputs).numpy()
    embeddings.append(embedding)
df["embedding"] = embeddings
df.to_pickle("products.pkl")