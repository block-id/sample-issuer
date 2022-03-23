from django.db import models


class SignChallenge(models.Model):
    content = models.TextField()
    signature = models.TextField(blank=True)
    pubkey = models.TextField(blank=True)
