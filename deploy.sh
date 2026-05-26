#!/bin/bash

# Navigate to the project directory
cd /home/Rexxuop/DMA || { echo "❌ Could not navigate to /home/Rexxuop/DMA"; exit 1; }

echo "🔄 Pulling latest changes from Git..."
git pull origin main

echo "📦 Installing requirements..."
pip install -r requirements.txt

echo "🗄️ Running migrations..."
python manage.py migrate

echo "🎨 Collecting static files..."
python manage.py collectstatic --noinput

echo "📁 Ensuring media directory exists..."
mkdir -p media

echo "🔍 Verifying Django Settings..."
python -c "import os; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dma_agency.settings'); from django.conf import settings; print(settings.SETTINGS_MODULE)"

echo "🌐 Verifying WSGI Import..."
python -c "from dma_agency.wsgi import application; print('✅ WSGI IMPORT SUCCESS')"

echo ""
echo "✅ Deployment finished!"
echo ""
echo "⚠️  MEDIA FILES — make sure PythonAnywhere Web tab has these Static Files mappings:"
echo "   URL: /static/   → Directory: /home/Rexxuop/DMA/staticfiles"
echo "   URL: /media/    → Directory: /home/Rexxuop/DMA/media"
echo ""
echo "👉 Then click 'Reload' in the PythonAnywhere dashboard."
