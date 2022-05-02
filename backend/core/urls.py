from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter

from core import views

app_name = "core"
router = DefaultRouter()
router.register(
    r"adhaar",
    views.adhaar_requests.AdhaarRequestViewset,
    basename="adhaar",
)
router.register(
    r"challenges",
    views.sign_challenge.SignChallengeViewset,
    basename="challenge",
)
router.register(
    r"verifier-requests",
    views.verifier_request.VerifierRequestViewset,
    basename="verifier-request",
)

urlpatterns = [
    path("api/", include(
        (router.urls, "api-adhaar"),
        namespace="api"
    )),
    re_path(".*", views.frontend_app),
]
