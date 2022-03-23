from django.dispatch import receiver
from django.db.models.signals import pre_save

from core.models.adhaar_request import AdhaarRequest
from core.utils import create_sign_challenge

@receiver(pre_save, sender=AdhaarRequest)
def adhaar_pre_save(sender, instance, *args, **kwargs):
    instance.sign_challenge = create_sign_challenge()
