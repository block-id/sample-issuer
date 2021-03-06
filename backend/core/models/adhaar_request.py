from django.db import models

from core.models.sign_challenge import SignChallenge


class AdhaarRequest(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    blood_type = models.CharField(max_length=3)
    dob = models.DateField()
    address = models.TextField()
    photograph = models.ImageField()
    sign_challenge: SignChallenge = models.OneToOneField(SignChallenge, on_delete=models.PROTECT)
    # If a request is fake, we use a different key to sign it.
    # In such a case, the digital wallet it is used in will not allow it to be added.
    is_fake = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"AdhaarRequest(first_name={self.first_name})"
