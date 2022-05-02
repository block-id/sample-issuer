from uuid import uuid4

from rest_framework import viewsets, mixins, status
from rest_framework.response import Response

from core.models.verifier_request import VerifierRequest
from core.serializers.verifier_request.create import VerifierRequestSerializer


class VerifierRequestViewset(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
):
    serializer_class = VerifierRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data={
            **request.data,
            "entropy": uuid4().hex
        })
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )
