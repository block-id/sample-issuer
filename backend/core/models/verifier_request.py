from django.db import models


class VerifierRequest(models.Model):
    id_type = models.CharField(max_length=34)
    attribute_groups = models.JSONField()
    entropy = models.TextField()
