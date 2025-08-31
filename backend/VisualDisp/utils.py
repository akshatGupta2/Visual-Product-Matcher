import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
from io import BytesIO

# Load the CLIP model and processor once to avoid reloading on each request.
print("Loading CLIP model for backend...")
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
# Update the processor initialization
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
# The correct variable name is 'device', which is defined below.
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)
print(f"Using device: {device}")

def generate_embedding(image_data):
    try:
        image = Image.open(BytesIO(image_data)).convert("RGB")
        # Ensure that the inputs are moved to the correct device variable.
        inputs = processor(images=image, return_tensors="pt").to(device)
        with torch.no_grad():
            image_features = model.get_image_features(**inputs)
        # Normalize the embedding
        image_features /= image_features.norm(dim=-1, keepdim=True)
        return image_features.cpu()
    except Exception as e:
        # This will now correctly print the error message from the exception.
        print(f"Error generating embedding: {e}")
        return None

def find_similar_products(query_embedding, all_products, k=50):
    
    if query_embedding is None or not all_products:
        return []

    # Extract embeddings from the product objects and stack them into a single tensor
    product_embeddings = torch.cat([p.embedding for p in all_products])
    
    # Calculate cosine similarity between the query and all products
    similarities = torch.matmul(query_embedding, product_embeddings.T).squeeze(0)
    
    # Get the top k similar products and their scores
    top_k_scores, top_k_indices = torch.topk(similarities, k)
    
    similar_products = []
    for i in range(k):
        # Retrieve the original product object and score
        product = all_products[top_k_indices[i].item()]
        score = top_k_scores[i].item()
        similar_products.append((product, score))
        
    return similar_products
