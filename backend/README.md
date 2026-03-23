# CENTRAI Backend - Naive Bayes Movie Genre Prediction

This is the Python Flask backend for the CENTRAI movie genre prediction system.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Place the IMDb Dataset

Make sure your `imdb_top_1000.csv` file is in one of these locations:
- `/tmp/sandbox/imdb_top_1000.csv` (project root)
- `/tmp/sandbox/backend/imdb_top_1000.csv` (backend directory)

The CSV should have these columns (or similar):
- `IMDB_Rating` or `rating` - Movie rating (0-10)
- `No_of_Votes` or `votes` - Number of votes
- `Genre` - Movie genre(s)
- `Meta_score` or create `popularity` metric

**Note:** If the CSV is not found, the system will automatically generate sample data for demonstration.

### 3. Run the Backend Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

You should see output like:
```
==================================================
  CENTRAI - Movie Genre Prediction API
  Naive Bayes Machine Learning Model
==================================================

=== Training Naive Bayes Model ===
✓ Dataset loaded from: ../imdb_top_1000.csv
✓ Dataset prepared: 1000 samples, 7 genres
✓ Data split: 800 training, 200 testing samples
✓ Model trained successfully

=== Model Performance ===
Training Accuracy: 91.25%
Testing Accuracy: 89.50%
Precision: 89.2%
Recall: 87.5%
F1-Score: 88.3%

✓ Model ready for predictions
```

## API Endpoints

### 1. Health Check
```
GET /api/health
```
Returns API status and model information.

### 2. Predict Genre
```
POST /api/predict
Content-Type: application/json

{
  "votes": 150000,
  "popularity": 85.5,
  "rating": 8.2
}
```
Returns predicted genre with confidence and probability distribution.

### 3. Get Model Metrics
```
GET /api/metrics
```
Returns model performance metrics (accuracy, precision, recall, F1-score).

### 4. Get Available Genres
```
GET /api/genres
```
Returns list of genres the model can predict.

## Dataset Format

If you're using your own CSV, ensure it has these columns:

| Column | Type | Description |
|--------|------|-------------|
| votes / No_of_Votes | int | Number of votes the movie received |
| popularity / Meta_score | float | Popularity score (0-100) |
| rating / IMDB_Rating | float | Movie rating (0-10) |
| genre / Genre | string | Movie genre (e.g., "Action", "Drama") |

## Model Details

- **Algorithm:** Gaussian Naive Bayes
- **Features:** votes, popularity, rating
- **Training Split:** 80% training, 20% testing
- **Evaluation Metrics:** Accuracy, Precision, Recall, F1-Score

## Troubleshooting

### CSV Not Found
If you see "⚠ Warning: imdb_top_1000.csv not found", the system will use sample data. Place your CSV in the project root or backend directory.

### Port Already in Use
If port 5000 is in use, modify the port in `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Change port here
```

### Dependencies Error
Make sure all dependencies are installed:
```bash
pip install --upgrade -r requirements.txt
```

## Integration with Frontend

The frontend is configured to call the backend API at `http://localhost:5000`. Make sure both servers are running:

1. **Backend:** `python backend/app.py` (port 5000)
2. **Frontend:** `pnpm dev` (port 5173 or similar)

The frontend will automatically connect to the backend for predictions.
