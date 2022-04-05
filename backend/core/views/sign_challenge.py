from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError

from core.models.sign_challenge import SignChallenge
from core.serializers.sign_challenge.detail import SignChallengeSerializer
from core.utils import create_adhaar_from_request, verify_and_save_sign_challenge


class SignChallengeViewset(viewsets.GenericViewSet, mixins.RetrieveModelMixin):
    serializer_class = SignChallengeSerializer
    queryset = SignChallenge.objects.all()

    @action(
        methods=["post"],
        detail=True,
        url_path="solve",
    )
    def solve(self, request, pk):
        # Verify solution
        challenge: SignChallenge = self.get_object()
        signature: str = request.data.get("signature", "")
        public_key: str = request.data.get("public_key", "")

        try:
            verify_and_save_sign_challenge(challenge, signature, public_key)
        except (AssertionError, ValueError) as e:
            raise ValidationError(str(e))

        # Issue new id
        if getattr(challenge, "adhaarrequest") is not None:
            id_file = create_adhaar_from_request(challenge.adhaarrequest)
        else:
            return HttpResponse()

        download = f"{request._request.scheme}://{request._request.get_host()}" + id_file
        return JsonResponse({
            "download_url": download
        })
