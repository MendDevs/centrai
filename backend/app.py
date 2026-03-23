"""
CENTRAI - Movie Genre Prediction Backend
Flask API with Naive Bayes Machine Learning Model
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix
import pickle
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Global variables for model and encoder
model = None
label_encoder = None
feature_columns = ['votes', 'popularity', 'rating']
model_metrics = {}

def load_and_prepare_data():
    """
    Load IMDb dataset and prepare it for training
    """
    try:
        # Try to load from parent directory or current directory
        csv_paths = [
            '../imdb_top_1000.csv',
            'imdb_top_1000.csv',
            '/tmp/sandbox/imdb_top_1000.csv'
        ]

        df = None
        for path in csv_paths:
            if os.path.exists(path):
                df = pd.read_csv(path)
                print(f"✓ Dataset loaded from: {path}")
                break

        if df is None:
            print("⚠ Warning: imdb_top_1000.csv not found. Using sample data.")
            # Create sample data for demonstration
            df = create_sample_data()

        # Clean and prepare data
        # Assuming the CSV has columns: votes, popularity, rating, genre
        # Adjust column names based on actual CSV structure

        # Common IMDb CSV column mappings
        column_mapping = {
            'IMDB_Rating': 'rating',
            'No_of_Votes': 'votes',
            'Genre': 'genre',
            'Meta_score': 'popularity'  # or create popularity from other metrics
        }

        # Rename columns if they match the mapping
        for old_col, new_col in column_mapping.items():
            if old_col in df.columns:
                df.rename(columns={old_col: new_col}, inplace=True)

        # Extract main genre (if multiple genres are present)
        if 'genre' in df.columns:
            df['genre'] = df['genre'].apply(lambda x: str(x).split(',')[0].strip() if pd.notna(x) else 'Unknown')

        # Create popularity score if not present
        if 'popularity' not in df.columns and 'votes' in df.columns and 'rating' in df.columns:
            # Normalize votes and rating to create popularity score
            df['popularity'] = (
                (df['votes'] / df['votes'].max() * 50) +
                (df['rating'] / 10 * 50)
            )

        # Handle missing values
        for col in feature_columns:
            if col in df.columns:
                df[col].fillna(df[col].median(), inplace=True)

        # Remove rows with missing genre
        df = df.dropna(subset=['genre'])

        # Filter out rare genres (keep genres with at least 10 samples)
        genre_counts = df['genre'].value_counts()
        valid_genres = genre_counts[genre_counts >= 10].index
        df = df[df['genre'].isin(valid_genres)]

        print(f"✓ Dataset prepared: {len(df)} samples, {len(valid_genres)} genres")
        print(f"  Genres: {', '.join(valid_genres[:10])}")

        return df

    except Exception as e:
        print(f"✗ Error loading data: {e}")
        return create_sample_data()

def create_sample_data():
    """
    Create sample data for demonstration if CSV is not available
    """
    np.random.seed(42)

    genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror', 'Romance']
    n_samples = 1000

    data = []
    for genre in genres:
        n = n_samples // len(genres)

        # Create genre-specific patterns
        if genre == 'Action':
            votes = np.random.randint(500000, 2500000, n)
            popularity = np.random.uniform(85, 98, n)
            rating = np.random.uniform(7.0, 9.5, n)
        elif genre == 'Drama':
            votes = np.random.randint(300000, 2000000, n)
            popularity = np.random.uniform(80, 95, n)
            rating = np.random.uniform(7.5, 9.5, n)
        elif genre == 'Comedy':
            votes = np.random.randint(100000, 1000000, n)
            popularity = np.random.uniform(70, 88, n)
            rating = np.random.uniform(6.5, 8.5, n)
        elif genre == 'Thriller':
            votes = np.random.randint(400000, 1800000, n)
            popularity = np.random.uniform(82, 93, n)
            rating = np.random.uniform(7.0, 9.0, n)
        elif genre == 'Sci-Fi':
            votes = np.random.randint(300000, 1500000, n)
            popularity = np.random.uniform(80, 92, n)
            rating = np.random.uniform(7.0, 8.8, n)
        elif genre == 'Horror':
            votes = np.random.randint(100000, 800000, n)
            popularity = np.random.uniform(75, 88, n)
            rating = np.random.uniform(6.0, 8.5, n)
        else:  # Romance
            votes = np.random.randint(100000, 900000, n)
            popularity = np.random.uniform(72, 87, n)
            rating = np.random.uniform(6.5, 8.3, n)

        for i in range(n):
            data.append({
                'votes': int(votes[i]),
                'popularity': float(popularity[i]),
                'rating': float(rating[i]),
                'genre': genre
            })

    df = pd.DataFrame(data)
    print("✓ Sample data created for demonstration")
    return df

def train_model():
    """
    Train the Naive Bayes model
    """
    global model, label_encoder, model_metrics

    print("\n=== Training Naive Bayes Model ===")

    # Load data
    df = load_and_prepare_data()

    # Prepare features and target
    X = df[feature_columns].values
    y = df['genre'].values

    # Encode genre labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )

    print(f"\n✓ Data split: {len(X_train)} training, {len(X_test)} testing samples")

    # Train Naive Bayes model
    model = GaussianNB()
    model.fit(X_train, y_train)

    print("✓ Model trained successfully")

    # Evaluate model
    y_pred_train = model.predict(X_train)
    y_pred_test = model.predict(X_test)

    train_accuracy = accuracy_score(y_train, y_pred_train)
    test_accuracy = accuracy_score(y_test, y_pred_test)

    # Calculate metrics for each genre
    precision = precision_score(y_test, y_pred_test, average='weighted', zero_division=0)
    recall = recall_score(y_test, y_pred_test, average='weighted', zero_division=0)
    f1 = f1_score(y_test, y_pred_test, average='weighted', zero_division=0)
    report = classification_report(
        y_test,
        y_pred_test,
        target_names=label_encoder.classes_,
        output_dict=True,
        zero_division=0
    )
    confusion = confusion_matrix(y_test, y_pred_test)

    per_genre_performance = {}
    for genre in label_encoder.classes_:
        genre_report = report.get(genre, {})
        per_genre_performance[genre] = {
            'precision': float(genre_report.get('precision', 0) * 100),
            'recall': float(genre_report.get('recall', 0) * 100),
            'f1_score': float(genre_report.get('f1-score', 0) * 100),
            'support': int(genre_report.get('support', 0))
        }

    sorted_by_f1 = sorted(
        per_genre_performance.items(),
        key=lambda item: item[1]['f1_score'],
        reverse=True
    )

    best_genres = [
        {'genre': genre, 'f1_score': metrics['f1_score']}
        for genre, metrics in sorted_by_f1[:3]
    ]
    weakest_genres = [
        {'genre': genre, 'f1_score': metrics['f1_score']}
        for genre, metrics in sorted_by_f1[-3:]
    ]

    model_metrics = {
        'train_accuracy': float(train_accuracy * 100),
        'test_accuracy': float(test_accuracy * 100),
        'precision': float(precision * 100),
        'recall': float(recall * 100),
        'f1_score': float(f1 * 100),
        'n_samples': len(df),
        'n_features': len(feature_columns),
        'genres': label_encoder.classes_.tolist(),
        'per_genre_performance': per_genre_performance,
        'confusion_matrix': {
            'labels': label_encoder.classes_.tolist(),
            'matrix': confusion.tolist()
        },
        'analysis': {
            'best_genres': best_genres,
            'weakest_genres': weakest_genres
        }
    }

    print(f"\n=== Model Performance ===")
    print(f"Training Accuracy: {train_accuracy*100:.2f}%")
    print(f"Testing Accuracy: {test_accuracy*100:.2f}%")
    print(f"Precision: {precision*100:.2f}%")
    print(f"Recall: {recall*100:.2f}%")
    print(f"F1-Score: {f1*100:.2f}%")

    print(f"\n✓ Model ready for predictions")

    # Save model (optional)
    try:
        with open('naive_bayes_model.pkl', 'wb') as f:
            pickle.dump((model, label_encoder, model_metrics), f)
        print("✓ Model saved to naive_bayes_model.pkl")
    except Exception as e:
        print(f"⚠ Could not save model: {e}")

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'message': 'CENTRAI API is running'
    })

@app.route('/api/predict', methods=['POST'])
def predict_genre():
    """
    Predict movie genre based on features
    Expected JSON: { "votes": int, "popularity": float, "rating": float }
    """
    try:
        data = request.json

        # Validate input
        required_fields = ['votes', 'popularity', 'rating']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Prepare features
        features = np.array([[
            float(data['votes']),
            float(data['popularity']),
            float(data['rating'])
        ]])

        # Predict
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]

        # Get genre name
        predicted_genre = label_encoder.inverse_transform([prediction])[0]

        # Create probability distribution
        prob_distribution = []
        for i, prob in enumerate(probabilities):
            genre = label_encoder.inverse_transform([i])[0]
            prob_distribution.append({
                'genre': genre,
                'probability': float(prob * 100)
            })

        # Sort by probability
        prob_distribution.sort(key=lambda x: x['probability'], reverse=True)

        return jsonify({
            'success': True,
            'prediction': {
                'genre': predicted_genre,
                'confidence': float(probabilities[prediction] * 100),
                'probabilities': prob_distribution
            },
            'input': {
                'votes': int(data['votes']),
                'popularity': float(data['popularity']),
                'rating': float(data['rating'])
            }
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """
    Get model performance metrics
    """
    return jsonify({
        'success': True,
        'metrics': model_metrics
    })

@app.route('/api/genres', methods=['GET'])
def get_genres():
    """
    Get list of available genres
    """
    if label_encoder is None:
        return jsonify({'error': 'Model not trained'}), 500

    return jsonify({
        'success': True,
        'genres': label_encoder.classes_.tolist()
    })

if __name__ == '__main__':
    print("\n" + "="*50)
    print("  CENTRAI - Movie Genre Prediction API")
    print("  Naive Bayes Machine Learning Model")
    print("="*50 + "\n")

    # Train model on startup
    train_model()

    print("\n" + "="*50)
    print("  Starting Flask Server...")
    print("  API: http://localhost:5000")
    print("="*50 + "\n")

    # Run Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)
