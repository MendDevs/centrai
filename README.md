# CENTRAI — Prédiction du genre des films avec Naive Bayes

Documentation:
- Version française: ce fichier
- English version: `README_EN.md`

Projet réalisé par **Emmanuel Markie Morris** et **Kemmegne Dassi Sherryl**.

## Contexte du projet

L’objectif est de prédire le **genre d’un film** à partir de caractéristiques numériques :
- **Votes** : nombre de votes IMDb
- **Popularité** : score de popularité
- **Rating** : note moyenne IMDb
- **Genre** : classe cible à prédire (Action, Comédie, Drame, etc.)

L’application combine :
- un **frontend React/TypeScript** (interface dynamique)
- un **backend Flask + scikit-learn** (entraînement et API de prédiction)

---

## Énoncé et mise en œuvre (étape par étape)

### 1) Télécharger le jeu de données IMDb
**Ce qui est demandé :** récupérer le dataset IMDb (Kaggle).

**Comment cela a été réalisé dans ce projet :**
- Le fichier utilisé est `backend/imdb_top_1000.csv`.
- Le backend tente de charger le dataset depuis plusieurs chemins (`backend/app.py`) et entraîne le modèle avec ce CSV quand il est trouvé.
- Si le CSV est absent, le backend génère des données de démonstration (fallback) pour éviter un blocage.

> Remarque : le code vérifie la présence et l’utilisation du CSV, mais ne peut pas prouver automatiquement la source Kaggle (c’est une étape manuelle d’acquisition).

### 2) Préparation des données
**Ce qui est demandé :**
- encoder les genres en valeurs numériques
- choisir les variables explicatives et la cible

**Comment cela a été réalisé :**
- Mapping des colonnes IMDb vers les noms utilisés par le modèle :
  - `IMDB_Rating` → `rating`
  - `No_of_Votes` → `votes`
  - `Genre` → `genre`
  - `Meta_score` → `popularity`
- Extraction du genre principal (si plusieurs genres sont présents).
- Gestion des valeurs manquantes (imputation par médiane sur les features).
- Encodage des labels avec `LabelEncoder` (genre texte → classe numérique).
- Variables retenues : `votes`, `popularity`, `rating`.
- Cible : `genre`.

### 3) Séparation des données
**Ce qui est demandé :** split train/test.

**Comment cela a été réalisé :**
- Utilisation de `train_test_split` avec :
  - `test_size=0.2`
  - `random_state=42`
  - `stratify=y_encoded` (préserve la distribution des genres)

### 4) Entraînement du modèle Naive Bayes
**Ce qui est demandé :** appliquer Naive Bayes pour classifier les genres.

**Comment cela a été réalisé :**
- Utilisation de `GaussianNB` (scikit-learn).
- Entraînement sur les features numériques du train set.
- Modèle prêt pour prédictions via endpoint API `/api/predict`.

### 5) Évaluation des performances
**Ce qui est demandé :** accuracy, recall, F1 (et précision).

**Comment cela a été réalisé :**
- Métriques calculées sur le test set :
  - `accuracy`
  - `precision` (weighted)
  - `recall` (weighted)
  - `f1-score` (weighted)
- Les métriques sont exposées via `/api/metrics`.

### 6) Analyse des résultats (par genre)
**Ce qui est demandé :** comprendre où le modèle réussit/échoue par classe.

**Comment cela a été réalisé :**
- Génération d’un `classification_report` détaillé par genre.
- Construction d’une **matrice de confusion**.
- Ajout dans les métriques backend :
  - `per_genre_performance` (precision/recall/f1/support par genre)
  - `confusion_matrix` (labels + matrice)
  - `analysis` (genres les plus performants et les plus faibles)

---

## Fonctionnalités de l’application

### Frontend
- Accueil avec hero dynamique/carrousel
- Catalogues de films alimentés depuis le CSV IMDb
- Explorer : recherche/filtre/tri sur les films du CSV
- Cartes films avec métadonnées + genre prédit au hover

### Backend
- API Flask pour santé, métriques, genres, prédiction
- Entraînement Naive Bayes au démarrage
- Analyse globale + par genre

---

## Structure du projet

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
└── README.md
```

---

## Installation et exécution

## 1) Frontend
```bash
npm install
npm run dev
```
Application sur `http://localhost:5173`.

## 2) Backend
```bash
cd backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python app.py
```
API sur `http://localhost:5000`.

---

## Endpoints API

- `GET /api/health` : état du backend et du modèle
- `POST /api/predict` : prédiction du genre
- `GET /api/metrics` : métriques globales + analyse par genre
- `GET /api/genres` : liste des genres appris

Exemple de payload `/api/predict` :
```json
{
  "votes": 150000,
  "popularity": 85.5,
  "rating": 8.2
}
```

---

## Notes importantes

- Les films affichés côté frontend proviennent du dataset IMDb (`backend/imdb_top_1000.csv`).
- Les URLs d’images sont normalisées en version haute qualité pour l’affichage.
- Les performances peuvent varier selon la version du dataset et le nettoyage appliqué.

---

## Auteurs

- **Emmanuel Markie Morris**
- **Kemmegne Dassi Sherryl**

Projet académique — Apprentissage & Estimation Bayésienne (Movies).
