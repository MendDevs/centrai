# CENTRAI — Movie Genre Prediction with Naive Bayes

Project by **Emmanuel Markie Morris** and **Kemmegne Dassi Sherryl**.

## Project Context

The goal is to predict a movie’s **genre** from numeric features:
- **Votes**: number of IMDb votes
- **Popularity**: popularity score
- **Rating**: average IMDb rating
- **Genre**: target class to predict (Action, Comedy, Drama, etc.)

This repository combines:
- a **React/TypeScript frontend** (dynamic interface)
- a **Flask + scikit-learn backend** (model training and prediction API)

---

## Problem Statement and Execution Steps

### 1) Download IMDb dataset
**Requirement:** download the IMDb dataset (commonly from Kaggle).

**How it was done in this project:**
- The dataset used by the app is stored as: `backend/imdb_top_1000.csv`.
- On startup, the backend tries known CSV locations and trains the model using this file.
- If the CSV is missing, the backend falls back to generated sample data to keep the app runnable.

Note: source provenance (Kaggle download proof) is a manual acquisition step; code verifies presence and usage of the dataset, not the original download source.

### 2) Data preparation
**Requirement:**
- convert genres to numeric labels
- select independent variables and target

**How it was done:**
- Column mapping in backend preprocessing:
  - IMDB_Rating -> rating
  - No_of_Votes -> votes
  - Genre -> genre
  - Meta_score -> popularity
- Main genre extraction from multi-genre entries (first genre token).
- Missing value handling (median imputation on numeric features).
- Label encoding with LabelEncoder (string genres -> numeric class IDs).
- Features used: votes, popularity, rating.
- Target used: genre.

### 3) Train/test split
**Requirement:** split data into training and test sets.

**How it was done:**
- train_test_split with:
  - test_size = 0.2
  - random_state = 42
  - stratify = encoded labels (class balance preservation)

### 4) Naive Bayes training
**Requirement:** train Naive Bayes for movie genre classification.

**How it was done:**
- Model: GaussianNB (scikit-learn).
- Fit on training features (votes, popularity, rating).
- Served through REST prediction endpoint: /api/predict.

### 5) Performance evaluation
**Requirement:** evaluate with accuracy, recall, and F1 (plus precision).

**How it was done:**
- Computed on test set:
  - accuracy
  - precision (weighted)
  - recall (weighted)
  - f1-score (weighted)
- Metrics are exposed via /api/metrics.

### 6) Result analysis
**Requirement:** analyze per-genre strengths and weaknesses.

**How it was done:**
- Added classification_report output (per-class precision/recall/f1/support).
- Added confusion matrix for class-by-class error analysis.
- /api/metrics now includes:
  - per_genre_performance
  - confusion_matrix (labels + matrix)
  - analysis (best and weakest genres by F1)

---

## Naive Bayes (Detailed Explanation)

### Why Naive Bayes for this project
Naive Bayes is a probabilistic classifier that is simple, fast, and effective for multi-class problems. It works well when you need quick training/inference and interpretable probability outputs.

### Core idea
For each genre class C and feature vector X = (votes, popularity, rating), the model computes:

P(C | X) proportional to P(C) * P(X | C)

Using the “naive” conditional independence assumption:

P(X | C) = P(votes | C) * P(popularity | C) * P(rating | C)

The predicted genre is the class with the highest posterior probability.

### Why GaussianNB specifically
Our inputs are continuous numeric features. GaussianNB models each feature distribution per class as a Gaussian (normal) distribution, which is appropriate for this type of tabular numeric data.

### How probabilities are used in the app
- The backend returns both:
  - top predicted genre
  - class probability distribution across all learned genres
- The frontend can display prediction confidence and compare true/main genre vs predicted genre in movie cards.

### Practical limitations in this dataset
- Feature overlap between some genres can reduce separability.
- The independence assumption is simplified and may not fully match real feature correlations.
- Some classes may be under-represented, affecting recall/F1 for those genres.

This is why per-genre metrics and confusion matrix were added: they reveal where the model is strong and where it confuses classes.

---

## Application Features

### Frontend
- Home page with dynamic hero carousel
- Movie collections generated from IMDb CSV (no dummy catalog)
- Explore page using the full CSV dataset (search/filter/sort)
- Hover cards with metadata and predicted genre labels

### Backend
- Flask API for health, metrics, available genres, and predictions
- Model training at startup
- Global and per-genre evaluation outputs

---

## Project Structure

```text
Dynamic Movie Genre Interface/
├── src/
│   └── app/
│       ├── components/
│       ├── data/
│       │   └── mockMovies.ts
│       ├── pages/
│       └── routes.tsx
├── backend/
│   ├── app.py
│   ├── imdb_top_1000.csv
│   ├── requirements.txt
│   └── README.md
├── README.md
└── README_EN.md
```

---

## Setup and Run

### Frontend
```bash
npm install
npm run dev
```
Runs on http://localhost:5173.

### Backend
```bash
cd backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python app.py
```
Runs on http://localhost:5000.

---

## API Endpoints

- GET /api/health
- POST /api/predict
- GET /api/metrics
- GET /api/genres

Prediction payload example:
```json
{
  "votes": 150000,
  "popularity": 85.5,
  "rating": 8.2
}
```

---

## Authors

- **Emmanuel Markie Morris**
- **Kemmegne Dassi Sherryl**

Academic project — Bayesian Learning & Estimation (Movies).
