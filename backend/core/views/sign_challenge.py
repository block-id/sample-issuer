from rest_framework import viewsets, mixins
from rest_framework.decorators import action

from core.models.sign_challenge import SignChallenge
from core.serializers.sign_challenge.detail import SignChallengeSerializer


class SignChallengeViewset(viewsets.GenericViewSet, mixins.RetrieveModelMixin):
    serializer_class = SignChallengeSerializer
    queryset = SignChallenge.objects.all()

    @action(
        methods=["post"],
        detail=True,
        url_path="solve",
    )
    def solve(self, request, pk):
        print("here", self.get_object())
