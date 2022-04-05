from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from core import urls as core_urls

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    # App URLs
    path("", include(core_urls, namespace="core")),
    # Other
    path('admin/', admin.site.urls),
]
