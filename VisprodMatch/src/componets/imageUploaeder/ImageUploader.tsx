import { useState } from "react";
import type { ChangeEvent } from "react";

interface ImageUploaderProps {
  onFileUpload: (file: File) => void;
  onImageUrlInput: (url: string) => void;
  handleSearch: () => void;
  loading: boolean;
  image: string | null;
}

const ImageUploader = function ({
  onFileUpload,
  onImageUrlInput,
  handleSearch,
  loading,
  image,
}: ImageUploaderProps) {
  const [url, setUrl] = useState<string>("");

  // Function to paste image from clipboard as a file
  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData.items;
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) onFileUpload(file);
        return;
      }
    }
  };

  return (
    <div className="d-flex flex-column gap-4 p-4 p-md-5 bg-dark rounded-bottom shadow">
      <label
        htmlFor="file-upload"
        className="d-flex flex-column justify-content-center w-100 h-48 border border-2 border-dashed border-secondary rounded-3 cursor-pointer bg-secondary bg-opacity-25 hover-bg-opacity-50 transition-colors"
        onPaste={handlePaste}
      >
        <div className="d-flex flex-column align-items-center justify-content-center pt-5 pb-6">
          <svg
                      className="mb-4 text-secondary"
                      style={{width: "2.5rem"}}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.207l-.93.93A7.4 7.4 0 0 1 1.5 6.5M10 16V9m0 0a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m0 0a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1"
            />
          </svg>
          <p className="mb-2 text-sm text-secondary">
            <span className="fw-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-secondary">
            SVG, PNG, JPG (MAX. 800x400px)
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="d-none"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.files && onFileUpload(e.target.files[0])
          }
        />
      </label>
      <div className="d-flex align-items-center text-secondary">
        <hr className="flex-grow-1 border-secondary" />
        <span className="mx-4 text-sm fw-semibold">OR</span>
        <hr className="flex-grow-1 border-secondary" />
      </div>
      <div className="d-flex flex-column flex-md-row gap-4">
        <input
          type="text"
          className="flex-grow-1 p-3 bg-secondary text-white rounded-3 border border-secondary focus-ring-primary transition-colors"
          placeholder="Paste image URL here..."
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
        />
        <button
          onClick={() => onImageUrlInput(url)}
          className="px-4 py-2 btn btn-primary"
        >
          Load URL
        </button>
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 px-4 py-2 w-100 btn btn-success fw-bold fs-5 shadow"
        disabled={loading || !image}
      >
        {loading ? (
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="spinner-border spinner-border-sm text-white"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            Searching...
          </div>
        ) : (
          "Find Similar Products"
        )}
      </button>
    </div>
  );
};

export default ImageUploader