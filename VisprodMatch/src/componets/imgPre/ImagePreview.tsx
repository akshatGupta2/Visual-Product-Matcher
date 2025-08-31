interface ImagePreviewProps {
  src: string | null;
}
function ImagePreview({ src }: ImagePreviewProps) {
    return (
      <div className="p-4 bg-dark rounded-3 shadow">
        <h2 className="h4 fw-bold text-light mb-4">Your Uploaded Image</h2>
        <div className="d-flex justify-content-center align-items-center h-64 overflow-hidden rounded-3 border border-2 border-secondary">
          <img
            src={src || ""}
            alt="Uploaded"
            className="img-fluid"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/400x400/333333/FFFFFF?text=Image+Not+Found";
            }}
          />
        </div>
      </div>
    );
}

export default ImagePreview