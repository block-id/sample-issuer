from django.urls import path, include
from rest_framework.routers import DefaultRouter

from core import views

app_name = "core"
router = DefaultRouter()
router.register(
    r"adhaar",
    views.adhaar_requests.AdhaarRequestViewset,
    basename="adhaar",
)

urlpatterns = [
    path("", views.frontend_app),
    path("api/", include(
        (router.urls, "api-adhaar"),
        namespace="api"
    ))
]
