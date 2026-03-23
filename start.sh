#!/bin/bash

echo "=================================================="
echo "  CENTRAI - Movie Genre Prediction Platform"
echo "=================================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm."
    exit 1
fi

echo "✓ Prerequisites check passed"
echo ""

# Function to start backend
start_backend() {
    echo "🚀 Starting Backend Server..."
    cd backend
    if [ ! -d "venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null
    pip install -q -r requirements.txt
    python app.py
}

# Function to start frontend
start_frontend() {
    echo "🚀 Starting Frontend Server..."
    pnpm install
    pnpm dev
}

echo "Choose an option:"
echo "1) Start Backend only"
echo "2) Start Frontend only"
echo "3) Start both (requires 2 terminals)"
echo ""
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        start_backend
        ;;
    2)
        start_frontend
        ;;
    3)
        echo ""
        echo "=================================================="
        echo "  Starting Both Servers"
        echo "=================================================="
        echo ""
        echo "⚠️  Note: This will start both servers in the background."
        echo "    Backend: http://localhost:5000"
        echo "    Frontend: http://localhost:5173"
        echo ""
        echo "Press Ctrl+C to stop all servers"
        echo ""

        # Start backend in background
        (cd backend && python3 app.py) &
        BACKEND_PID=$!

        # Wait a bit for backend to start
        sleep 3

        # Start frontend
        pnpm dev &
        FRONTEND_PID=$!

        # Wait for both processes
        wait $BACKEND_PID $FRONTEND_PID
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac
