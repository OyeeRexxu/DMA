import os
import sys

path = '/home/Rexxuop/DMA'

if path not in sys.path:
    sys.path.append(path)

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'DMA.settings'
)

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
