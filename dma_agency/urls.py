from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core import views as v

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', v.variant_1, name='home'),
    path('work/', v.v1_work, name='v1_work'),
    path('work/<slug:slug>/', v.v1_work_detail, name='v1_work_detail'),
    path('services/', v.v1_services, name='v1_services'),
    path('contact/', v.v1_contact, name='v1_contact'),

    # Variant 1 Alias for compatibility
    path('v1/', v.variant_1, name='v1'),
    path('v1/services/', v.v1_services),
    path('v1/work/', v.v1_work),
    path('v1/work/<slug:slug>/', v.v1_work_detail),
    path('v1/contact/', v.v1_contact),

    # Variant 2
    path('v2/', v.variant_2, name='v2'),
    path('v2/services/', v.v2_services, name='v2_services'),
    path('v2/work/', v.v2_work, name='v2_work'),
    path('v2/work/<slug:slug>/', v.v2_work_detail, name='v2_work_detail'),
    path('v2/contact/', v.v2_contact, name='v2_contact'),

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

    # Variant 6
    path('v6/', v.variant_6, name='v6'),
    path('v6/services/', v.v6_services, name='v6_services'),
    path('v6/work/', v.v6_work, name='v6_work'),
    path('v6/work/<slug:slug>/', v.v6_work_detail, name='v6_work_detail'),
    path('v6/contact/', v.v6_contact, name='v6_contact'),

    # Variant 7 – Pytia Particle Globe (GIF/Image Match)
    path('v7/', v.variant_7, name='v7'),
    # Variant 8 – AlgoPros Geodesic Sphere (GIF Match)
    path('v8/', v.variant_8, name='v8'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
