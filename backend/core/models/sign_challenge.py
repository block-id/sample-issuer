from django.db import models


class SignChallenge(models.Model):
    content = models.TextField()
    signature = models.TextField(blank=True)
    pubkey = models.TextField(blank=True)

    def __str__(self) -> str:
        return f"SignChallenge(content={self.content}, signature={self.signature})"
