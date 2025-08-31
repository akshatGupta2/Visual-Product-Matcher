# Visual Product Matcher

A web application that uses zero-shot image recognisation to find the fitness product you require. It achieves this through the innovations of OpenAI's CLIP Model.

## Features
* Visual search for fitness equipment
* Real-time image preview.
* Upload images via file or URL
* Adjustable number of search results
* Responsive design for all devices
* Similarity score display for matched products

## Tech Stack

### Frontend
* React with TypeScript (SWC)
* Vite for build tooling
* Bootstrap for styling
* Fetch API for API calls

### Backend
* Flask (Python)
* OpenAI CLIP model for image processing
* SQLite database
* Flask-CORS for cross-origin handling

## Getting Started

### Prerequisites 
* Python 3.12+
* Node.js 19+
* npm or yarn (not tested)

### Backend Setup
1. Navigate to the ``backend`` directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv .venv
.venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Setup Environment variables
```bash
copy .env.eg .env
```

5. Run the backend server:
```bash
python run.py
```
### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd VisprodMatch
```

2. Install dependencies:
```bash
npm install
```

3. Run the development variables
```bash
copy .env.example .env
```

4. Run the development server:
```bash
npm run dev
```
## Usage

1. Open the application in your browser
2. Upload an image of fitness equipment either by:
   - Dragging and dropping an image file
   - Clicking the upload button to select a file
   - Providing an image URL
3. Adjust the number of results you want to see using the dropdown
4. View similar products with their similarity scores

## API Endpoints

### POST /search
Upload an image to find similar products

**Request Body:**
- `file`: Image file (multipart/form-data)
- OR
- `url`: Image URL (form data)

**Response:**
```json
{
  "results": [
    {
      "id": number,
      "name": string,
      "similarity_score": number,
      "image_url": string
    }
  ]
}
```

## Project Structure

```
├── backend/                # Flask backend
│   ├── VisualDisp/        # Main application package
│   │   ├── static/        # Static files and images
│   │   ├── routes.py      # API endpoints
│   │   ├── models.py      # Database models
│   │   └── utils.py       # CLIP model utilities
│   └── run.py             # Application entry point
│
└── VisprodMatch/          # React frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── App.tsx        # Main application component
    │   └── main.tsx       # Entry point
    └── public/            # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.