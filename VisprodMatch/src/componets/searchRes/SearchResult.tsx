import { useState } from "react"
import type { Product } from "../../App"
import ProductCard from "../prodCard/ProductCard"

interface SearchResultsProps {
  products: Product[];
}

const SearchResult = ({ products }: SearchResultsProps) => {
  const [displayLimit, setDisplayLimit] = useState<number>(12)

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayLimit(Number(event.target.value))
  };

  // Filter products based on display limit
  const displayedProducts = products.slice(0, displayLimit);

  return (
    <div className="p-4 bg-dark rounded-3 shadow">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold text-light mb-0">Similar Products</h2>
        <div className="d-flex align-items-center">
          <label htmlFor="displayLimit" className="text-light me-2">
            Filter:
          </label>
          <select
            id="displayLimit"
            className="form-select form-select-sm w-auto"
            value={displayLimit}
            onChange={handleLimitChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
            <option value={products.length}>All</option>
          </select>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {displayedProducts.map((product) => (
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
};

export default SearchResult
