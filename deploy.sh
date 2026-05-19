#!/bin/bash

echo "🔄 Pulling latest changes from Git..."
git pull origin main

echo "📦 Installing requirements..."
pip install -r requirements.txt

echo "🗄️ Running migrations..."
python manage.py migrate

echo "🎨 Collecting static files..."
python manage.py collectstatic --noinput

echo "🔍 Verifying Django Settings..."
python -c "import os; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dma_agency.settings'); from django.conf import settings; print(settings.SETTINGS_MODULE)"

echo "🌐 Verifying WSGI Import..."
python -c "from dma_agency.wsgi import application; print('✅ WSGI IMPORT SUCCESS')"

echo "🚀 Deployment finished! Please reload your web app in the PythonAnywhere dashboard."
