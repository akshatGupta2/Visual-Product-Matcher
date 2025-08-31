import type { Product } from "../../App"

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="card bg-secondary bg-opacity-25 rounded-3 shadow-sm mx-1 overflow-hidden product-card-hover">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="card-img-top object-fit-cover"
        style={{ height: "12rem" }}
      />
      <div className="card-body">
        <h3 className="card-title h5 fw-bold text-light">{product.name}</h3>
        <p className="card-text text-sm text-secondary mb-2">
          {product.category}
        </p>
        <div className="d-flex align-items-center justify-content-between">
          <span className="text-sm fw-semibold text-secondary">
            Similarity: {(product.similarity* 10 ).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard
