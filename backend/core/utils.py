from uuid import uuid4

from core.models.sign_challenge import SignChallenge

def create_sign_challenge() -> SignChallenge:
    challenge = SignChallenge(content=uuid4().hex)
    challenge.save()
    return challenge
