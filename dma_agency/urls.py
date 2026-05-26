from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core import views as v

urlpatterns = [
    path('admin/', admin.site.urls),

    # ── Root → Variant 1 (main) ──────────────────────────
    path('', v.variant_1, name='home'),

    # Variant 1 (still accessible via /v1/)
    path('v1/', v.variant_1, name='v1'),
    path('v1/services/', v.v1_services, name='v1_services'),
    path('v1/work/', v.v1_work, name='v1_work'),
    path('v1/work/<slug:slug>/', v.v1_work_detail, name='v1_work_detail'),
    path('v1/contact/', v.v1_contact, name='v1_contact'),

    # Variant 3
    path('v3/', v.variant_3, name='v3'),
    path('v3/services/', v.v3_services, name='v3_services'),
    path('v3/work/', v.v3_work, name='v3_work'),
    path('v3/work/<slug:slug>/', v.v3_work_detail, name='v3_work_detail'),
    path('v3/contact/', v.v3_contact, name='v3_contact'),

    # Variant 4
    path('v4/', v.variant_4, name='v4'),
    path('v4/services/', v.v4_services, name='v4_services'),
    path('v4/work/', v.v4_work, name='v4_work'),
    path('v4/work/<slug:slug>/', v.v4_work_detail, name='v4_work_detail'),
    path('v4/contact/', v.v4_contact, name='v4_contact'),

    # Variant 5
    path('v5/', v.variant_5, name='v5'),
    path('v5/services/', v.v5_services, name='v5_services'),
    path('v5/work/', v.v5_work, name='v5_work'),
    path('v5/work/<slug:slug>/', v.v5_work_detail, name='v5_work_detail'),
    path('v5/contact/', v.v5_contact, name='v5_contact'),

    # Variant 8
    path('v8/', v.variant_8, name='v8'),
    path('v8/services/', v.v8_services, name='v8_services'),
    path('v8/work/', v.v8_work, name='v8_work'),
    path('v8/work/<slug:slug>/', v.v8_work_detail, name='v8_work_detail'),
    path('v8/contact/', v.v8_contact, name='v8_contact'),

    # Variant 14 — Quantum Glass
    path('v14/', v.variant_14, name='v14'),
    path('v14/services/', v.v14_services, name='v14_services'),
    path('v14/work/', v.v14_work, name='v14_work'),
    path('v14/work/<slug:slug>/', v.v14_work_detail, name='v14_work_detail'),
    path('v14/contact/', v.v14_contact, name='v14_contact'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
