from rest_framework import serializers

from core.models.verifier_request import VerifierRequest


class VerifierRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerifierRequest
        fields = [
            "id",
            "id_type",
            "attribute_groups",
            "entropy",
        ]
