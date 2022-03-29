from uuid import uuid4

from lib.crypto.keystore import KeyStore
from core.models.sign_challenge import SignChallenge


def create_sign_challenge() -> SignChallenge:
    challenge = SignChallenge(content=uuid4().hex)
    challenge.save()
    return challenge


def verify_and_save_sign_challenge(
    challenge: SignChallenge, signature: str, public_key: str
) -> None:
    # Verify signature
    keystore = KeyStore((public_key, None), None)
    is_valid = keystore.verify(
        "Emu Signed Message:\n" + challenge.content,
        signature,
    )
    assert is_valid, "Signature not valid."
    # Update sign challenge
    challenge.signature = signature
    challenge.pubkey = public_key
    challenge.save()
