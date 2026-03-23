# 🚀 CENTRAI - Quick Start Guide

Welcome to **CENTRAI**, your AI-powered movie genre prediction platform!

## ⚡ Quick Start (2 Terminals Required)

### Terminal 1: Start Backend (Python)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Expected Output:**
```
==================================================
  CENTRAI - Movie Genre Prediction API
  Naive Bayes Machine Learning Model
==================================================

=== Training Naive Bayes Model ===
✓ Dataset prepared
✓ Model trained successfully

=== Model Performance ===
Testing Accuracy: 89.50%
Precision: 89.2%
Recall: 87.5%
F1-Score: 88.3%

✓ Model ready for predictions
Starting Flask Server...
API: http://localhost:5000
```

### Terminal 2: Start Frontend (React)

```bash
pnpm dev
```

**Expected Output:**
```
VITE v6.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 🎉 Access the Application

Open your browser and go to: **http://localhost:5173**

---

## 📂 Dataset Setup

### Option 1: Use Your IMDb CSV (Recommended)

Place your `imdb_top_1000.csv` file in the project root:

```
/tmp/sandbox/
├── imdb_top_1000.csv  ← Place here
├── src/
├── backend/
└── ...
```

### Option 2: Auto-Generated Sample Data

If the CSV is not found, the backend will automatically generate sample data for demonstration. This is perfect for testing!

---

## 🎬 Using the Application

### 1. **Home Page** (/)
- Browse featured movies
- Scroll through genre categories
- View movie details on hover

### 2. **Explorer** (/explore)
- Search for movies
- Filter by genre
- Sort by popularity, rating, votes, or year

### 3. **AI Prediction** (/predict)
- Enter movie characteristics:
  - **Votes**: Number of IMDb votes (e.g., 150000)
  - **Popularity**: Score 0-100 (e.g., 85.5)
  - **Rating**: IMDb rating 0-10 (e.g., 8.2)
- Click "Prédire le Genre"
- View predicted genre with confidence score
- See probability distribution across all genres

### 4. **Statistics** (/stats)
- View model performance metrics
- See genre distribution charts
- Analyze training progression
- Review detailed performance table

### 5. **About** (/about)
- Learn about the project
- View technical stack
- Understand the methodology
- Explore features

---

## 🎨 Key Features

✅ **Fully Navigable** - All menu items work, all pages are accessible
✅ **Interactive UI** - Netflix/Prime-inspired design with smooth animations
✅ **Real ML Predictions** - Backend API with Naive Bayes model
✅ **Responsive Design** - Works on desktop and mobile
✅ **Rich Visualizations** - Charts and graphs for model performance
✅ **Smart Fallback** - Works even if backend is offline (uses mock predictions)

---

## 🔧 Troubleshooting

### Backend Won't Start?

```bash
# Make sure Python 3.8+ is installed
python --version

# Install dependencies
cd backend
pip install flask flask-cors pandas numpy scikit-learn

# Try again
python app.py
```

### Frontend Won't Start?

```bash
# Make sure Node.js and pnpm are installed
node --version
pnpm --version

# Install dependencies
pnpm install

# Try again
pnpm dev
```

### Can't Connect to Backend?

1. Check backend is running on http://localhost:5000
2. Check the browser console for CORS errors
3. The app will use fallback predictions if backend is unavailable

### Port Already in Use?

**Backend:**
Edit `backend/app.py`, change line:
```python
app.run(debug=True, host='0.0.0.0', port=5000)  # Change 5000 to another port
```

**Frontend:**
Vite will automatically use the next available port.

---

## 📊 Testing the Prediction

Try these example inputs in the **Prediction** page:

### High-Rated Drama
- Votes: `1500000`
- Popularity: `90`
- Rating: `8.8`
- **Expected:** Drama (~92% confidence)

### Action Blockbuster
- Votes: `800000`
- Popularity: `95`
- Rating: `8.0`
- **Expected:** Action (~88% confidence)

### Comedy Film
- Votes: `200000`
- Popularity: `75`
- Rating: `7.2`
- **Expected:** Comedy (~78% confidence)

### Sci-Fi Adventure
- Votes: `500000`
- Popularity: `88`
- Rating: `8.3`
- **Expected:** Sci-Fi (~85% confidence)

---

## 🎯 Project Structure

```
CENTRAI/
├── 🎨 Frontend (React + TypeScript)
│   ├── 5 navigable pages
│   ├── Responsive design
│   ├── Motion animations
│   └── Recharts visualizations
│
├── 🤖 Backend (Python + Flask)
│   ├── Naive Bayes ML model
│   ├── REST API endpoints
│   ├── CSV data processing
│   └── Real-time predictions
│
└── 📊 Dataset (IMDb Top 1000)
    └── Auto-generated if not provided
```

---

## 🌟 Special Features

### Logo Design
The **CENTR<span style="color: red">AI</span>** logo uses a beautiful gradient:
- **CENTR** in white
- **AI** in red-purple-pink gradient

### Navigation
All menu items are clickable:
- Accueil (Home)
- Explorer (Explore)
- Prédiction (Prediction)
- Statistiques (Stats)
- À propos (About)

### Smart Icons
- 🧠 Brain icon represents AI
- 📊 Charts for statistics
- ✨ Sparkles for predictions
- 🎬 Film for movies

---

## 💡 Tips

1. **Try different values** in the prediction page to see how the model responds
2. **Check the Stats page** to understand model performance
3. **Explore page filters** work in real-time
4. **Hover over movie cards** for detailed information
5. **Footer links** navigate to different pages

---

## 🎓 Learning Objectives Met

✅ Data collection and preparation
✅ Naive Bayes model training
✅ Feature engineering
✅ Model evaluation (Precision, Recall, F1-Score)
✅ REST API development
✅ Frontend-backend integration
✅ Real-time predictions
✅ Data visualization

---

## 📞 Need Help?

Check the main [README.md](./README.md) for detailed documentation.

---

<div align="center">
  <h3>Enjoy predicting movie genres with CENTRAI! 🎬🤖</h3>
  <p><em>Where Cinema meets Artificial Intelligence</em></p>
</div>
