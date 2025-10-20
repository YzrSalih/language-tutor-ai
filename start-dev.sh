#!/bin/bash

# Language Tutor AI - Development Starter Script

echo "🚀 Language Tutor AI Başlatılıyor..."

# Backend başlat
echo "📡 Backend başlatılıyor..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

echo "⚠️  .env dosyasını oluşturmayı unutmayın!"
echo "💡 OpenAI API anahtarınızı .env dosyasına ekleyin"

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ .env dosyası oluşturuldu. Lütfen OpenAI API anahtarınızı ekleyin."
fi

echo "🔧 Backend sunucusu başlatılıyor..."
python main.py &
BACKEND_PID=$!

cd ..

# Frontend başlat
echo "💻 Frontend başlatılıyor..."
cd frontend
npm install
npm start &
FRONTEND_PID=$!

cd ..

echo "✅ Uygulama başlatıldı!"
echo "🌐 Frontend: http://localhost:3000"
echo "📡 Backend: http://localhost:8000"
echo ""
echo "❌ Durdurmak için Ctrl+C kullanın"

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Sunucular kapatılıyor..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT

wait
