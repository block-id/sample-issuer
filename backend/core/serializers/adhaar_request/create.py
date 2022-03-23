from rest_framework import serializers

from core.models.adhaar_request import AdhaarRequest
from core.serializers.sign_challenge.detail import SignChallengeSerializer

class AdhaarRequestSerializer(serializers.ModelSerializer):
    sign_challenge = SignChallengeSerializer(required=False)

    class Meta:
        model = AdhaarRequest
        fields = "__all__"
        read_only_fields = ["created_at", "sign_challenge"]
