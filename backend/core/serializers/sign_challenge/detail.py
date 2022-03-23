from rest_framework import serializers

from core.models.sign_challenge import SignChallenge


class SignChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignChallenge
        fields = "__all__"
