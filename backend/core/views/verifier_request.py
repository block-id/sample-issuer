from uuid import uuid4
from django.http import JsonResponse

from django.urls import reverse
from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.decorators import action


from lib.utils import get_full_url
from core.models.verifier_request import VerifierRequest
from core.serializers.verifier_request.create import VerifierRequestSerializer


class VerifierRequestViewset(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
):
    queryset = VerifierRequest.objects.all()
    serializer_class = VerifierRequestSerializer

    def create(self, request, *args, **kwargs):
        # Create the verifier request
        serializer = self.get_serializer(data={**request.data, "entropy": uuid4().hex})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def retrieve(self, request, *args, **kwargs):
        # Return a wallet verifier payload
        instance: VerifierRequest = self.get_object()
        wallet_payload = {
            "idType": instance.id_type,
            "attributeGroups": instance.attribute_groups,
            "requesterName": "Sample Govt Office",
            "entropy": instance.entropy,
            "sendTo": get_full_url(
                request,
                reverse(
                    "core:api:verifier-request-upload",
                    kwargs={
                        "pk": instance.id,
                    },
                )
            ),
        }
        return JsonResponse(wallet_payload, status=status.HTTP_200_OK)

    @action(
        methods=["post"],
        detail=True,
        url_path="upload",
    )
    def upload(self, request, pk):
        print("here", request.data)
