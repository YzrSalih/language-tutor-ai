# Language Tutor AI

AI destekli dil öğrenme platformu. Python FastAPI backend ve React TypeScript frontend kullanılarak geliştirilmiştir.

## 🌟 Özellikler

- **Akıllı Sohbet**: AI öğretmeninizle doğal konuşmalar yapın
- **Kişisel Dersler**: İlginizi çeken konularda özel dersler oluşturun
- **Hızlı Geri Bildirim**: Anında düzeltmeler ve açıklamalar
- **Çoklu Dil Desteği**: 10+ farklı dilde öğrenme imkanı
- **Seviye Uygunluğu**: Başlangıç, orta ve ileri seviye destegi

## 🛠️ Teknolojiler

### Backend
- Python 3.8+
- FastAPI
- OpenAI GPT API
- SQLAlchemy
- PostgreSQL
- Uvicorn

### Frontend
- React 18
- TypeScript
- Styled Components
- Axios
- React Router
- Lucide React Icons

## 🚀 Kurulum

### Gereksinimler
- Python 3.8+
- Node.js 16+
- npm veya yarn
- OpenAI API anahtarı

### Backend Kurulumu

1. Backend dizinine gidin:
```bash
cd backend
```

2. Python sanal ortam oluşturun:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# veya
venv\Scripts\activate  # Windows
```

3. Gerekli paketleri yükleyin:
```bash
pip install -r requirements.txt
```

4. Çevre değişkenlerini ayarlayın:
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyip OpenAI API anahtarınızı ekleyin:
```
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=postgresql://username:password@localhost/language_tutor_db
```

5. Sunucuyu başlatın:
```bash
python main.py
```

Backend http://localhost:8000 adresinde çalışacak.

### Frontend Kurulumu

1. Frontend dizinine gidin:
```bash
cd frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm start
```

Frontend http://localhost:3000 adresinde çalışacak.

## 📁 Proje Yapısı

```
language-tutor-ai/
├── backend/
│   ├── main.py              # FastAPI uygulaması
│   ├── requirements.txt     # Python bağımlılıkları
│   └── .env.example        # Çevre değişkenleri örneği
└── frontend/
    ├── src/
    │   ├── components/     # React bileşenleri
    │   ├── pages/         # Sayfa bileşenleri
    │   ├── services/      # API servisleri
    │   ├── styles/        # Global stiller
    │   └── types/         # TypeScript tipleri
    ├── package.json       # Node.js bağımlılıkları
    └── .env              # Frontend çevre değişkenleri
```

## 🔧 API Endpoints

### Chat
- `POST /chat` - AI öğretmen ile sohbet
- `GET /languages` - Desteklenen dilleri listele

### Dersler
- `POST /generate-lesson` - Kişisel ders oluştur

### Sistem
- `GET /` - Sağlık kontrolü

## 🎯 Kullanım

1. Ana sayfada uygulamaya genel bakış
2. **Sohbet** sayfasında:
   - Öğrenmek istediğiniz dili seçin
   - Seviyenizi belirleyin
   - AI öğretmeninizle sohbet edin
3. **Dersler** sayfasında:
   - İlginizi çeken konuyu girin
   - Kişisel dersler oluşturun
   - Kelime hazinesi ve alıştırmalarla öğrenin

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.