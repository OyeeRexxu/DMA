import os
import sys

path = '/home/Rexxuop/DMA'

if path not in sys.path:
    sys.path.append(path)

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'dma_agency.settings'
)

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()