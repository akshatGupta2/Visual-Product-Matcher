import io
import torch
from flask import Blueprint, jsonify, request, url_for
import requests
import numpy as np
from PIL import Image
from urllib.parse import urlparse
from .models import Products
from .utils import generate_embedding, find_similar_products

routes_bp = Blueprint("routes_bp", __name__)

@routes_bp.route("/", methods=["GET"])
def greet():
    return jsonify({
        "Hello": "hello ji"
    })
    
@routes_bp.route("/search", methods=["POST"])
def search_prod():
    try:
        image_bytes = None
        image = None

        # Handle file upload
        if "file" in request.files:
            file = request.files["file"]
            if file.filename == "":
                return jsonify({"error": "No file selected"}), 400
            image_bytes = file.read()
            
        elif "url" in request.form:
            url = request.form["url"]
            try:
                parsed = urlparse(url)
                if all([parsed.scheme, parsed.netloc]):
                    response = requests.get(url, timeout=5)
                    response.raise_for_status()
                    image_bytes = response.content
                else:
                    return jsonify({"error": "Invalid URL format"}), 400
            except requests.exceptions.RequestException as e:
                return jsonify({"error": f"Failed to fetch image from URL: {str(e)}"}), 400
        else:
            return jsonify({"error": "No image File or URL Provided"}), 400
        
        # Process image bytes regardless of source
        try:
            image = Image.open(io.BytesIO(image_bytes))
            image.verify()  # Verify it's a valid image
            image = Image.open(io.BytesIO(image_bytes))  # Reopen after verify
        except Exception as e:
            return jsonify({"error": f"Invalid image data: {str(e)}"}), 400

        if not image:
            return jsonify({"error": "Cannot process the image data"}), 400
        
        # Generate embedding from image
        query_embedding = generate_embedding(image_bytes)
        if query_embedding is None:
            return jsonify({"error": "Failed to generate embedding"}), 400

        BATCH_SIZE = 50
        all_products = []
        
        for offset in range(0, Products.query.count(), BATCH_SIZE):
            batch = Products.query.offset(offset).limit(BATCH_SIZE).all()
            all_products.extend(batch)
        
        # Convert binary embeddings to tensors
        for product in all_products:
            if product.embedding:
                # Create a writeable copy of the numpy array before converting to tensor
                embedding_array = np.frombuffer(product.embedding, dtype=np.float32).copy()
                product.embedding = torch.from_numpy(embedding_array).reshape(1, -1)

        # Filter out products without embeddings
        valid_products = [p for p in all_products if p.embedding is not None]
        
        if not valid_products:
            return jsonify({"error": "No products with embeddings found"}), 404

        # Find similar products
        results = find_similar_products(query_embedding, valid_products)
        
        product_list = [
            {
                "id": product.id,
                "name": product.name,
                "similarity_score": float(score),
                "image_url": url_for('static', filename=f'assets/imgs/{product.id}.jpg', _external=True)
            }
            for product, score in results
        ]
        
        return jsonify({"results": product_list}), 200
        
    except Exception as e:
        print(f"Error in search_prod: {str(e)}")  # Log the error
        return jsonify({"error": f"An internal error occurred: {str(e)}"}), 500
