import { useState } from "react";
import Header from "./componets/header/Header";
import ImageUploader from "./componets/imageUploaeder/ImageUploader";
import ImagePreview from "./componets/imgPre/ImagePreview";
import SearchResult from "./componets/searchRes/SearchResult";
// import ResultsFilter from "./components/ResultsFilter/ResultsFilter";

export interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  similarity: number;
}

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const handleFileUpload = (file: File) => {
    if (file) {
      setImage(URL.createObjectURL(file));
      // Reset state on new upload
      setResults([]);
      setError(null);
    }
  };

  // Handler for image URL input
  const handleImageUrlInput = (url: string) => {
    setImage(url);
    // Reset state on new URL input
    setResults([]);
    setError(null);
  };

  // Main search function
  const handleSearch = async () => {
    if (!image) {
      setError("Please upload an image or provide a URL first.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Check if image is a URL or File
      if (image.startsWith("data:") || image.startsWith("blob:")) {
        // Convert blob URL back to File
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append("file", blob, "image.jpg");
      } else if (image.startsWith("http")) {
        // If it's a URL, send it as URL parameter
        formData.append("url", image);
      }

      const response = await fetch(`${API_URL}/search`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Store all results
      const transformedResults: Product[] = data.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        category: "Fitness Equipment", // You might want to add category in backend response
        imageUrl: item.image_url,
        similarity: item.similarity_score,
      }));

      // setAllResults(transformedResults);
      setResults(transformedResults);
    } catch (e) {
      console.error("Search error:", e);
      setError(
        e instanceof Error ? e.message : "Failed to perform visual search"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-dark text-white p-3 p-md-5">
      <div className="container mx-auto my-3 space-y-4">
        <Header />
        <ImageUploader
          onFileUpload={handleFileUpload}
          onImageUrlInput={handleImageUrlInput}
          handleSearch={handleSearch}
          loading={loading}
          image={image}
        />
        {image && (
          <div className="space-y-4 mt-4">
            <ImagePreview src={image} />
            <SearchResult
              products={results}
            />
          </div>
        )}
        {error && (
          <div className="p-4 bg-danger text-white rounded-3 shadow text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
