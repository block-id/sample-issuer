from django.db import models


class VerifierRequest(models.Model):
    id_type = models.CharField(max_length=34)
    attribute_groups = models.JSONField()
    entropy = models.TextField()
    verifiable_presentation = models.JSONField(null=True)
    # The token is sent back to the user upon successful ID verification
    token = models.TextField(blank=True)
