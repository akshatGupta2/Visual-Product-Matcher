import type { Product } from "../../App"
import ProductCard from "../prodCard/ProductCard";

interface SearchResultsProps {
  products: Product[];
}

const SearchResult = ({products}: SearchResultsProps) => {
  return (
    <div className="p-4 bg-dark rounded-3 shadow">
      <h2 className="h4 fw-bold text-light mb-4">Similar Products</h2>
      {products.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-secondary p-4">
          No similar products found.
        </div>
      )}
    </div>
  );
}

export default SearchResult