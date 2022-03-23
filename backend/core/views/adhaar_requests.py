from rest_framework import viewsets, mixins

from core.serializers.adhaar_request.create import AdhaarRequestSerializer

class AdhaarRequestViewset(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin):
    serializer_class = AdhaarRequestSerializer
