# All utility functions are written here. Too lazy to follow good structure :(
import os
import imghdr
import json
import typing
from hashlib import sha256
from datetime import datetime
from base64 import b64encode
from uuid import uuid4

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from eth_account import Account
from eth_account.messages import encode_defunct

from lib.crypto.keystore import KeyStore
from lib.json_ids.validate import validate_json_id
from lib.smart_contracts.web3_helpers import get_web3_http_provider
from core.models.sign_challenge import SignChallenge
from core.models.adhaar_request import AdhaarRequest


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


def get_image_base64(file: typing.BinaryIO, file_type: str = "svg+xml") -> str:
    file_type = imghdr.what(file) or file_type
    encoded = b64encode(file.read())
    return f"data:image/{file_type};base64,{encoded}"


def get_image_base64_by_path(path: str, file_type: str = "svg+xml"):
    with open(path, "rb") as f:
        return get_image_base64(f, file_type)


def json_to_msg(json_data: typing.Any) -> str:
    data = json.dumps(json_data, separators=(",", ":")).encode("utf-8")
    message = sha256(data).digest().hex()
    return message


def sign_json(account: Account, data: typing.Any) -> str:
    message = json_to_msg(data)
    return account.sign_message(encode_defunct(hexstr=message)).signature.hex()


def create_adhaar_from_request(request: AdhaarRequest) -> str:
    w3 = get_web3_http_provider(settings.WEB3_HTTP_PROVIDER)
    account: Account = w3.eth.account.from_key(settings.ADHAAR_PRIVATE_KEY)
    id = {
        "data": {
            "idType": settings.ADHAAR_ID_TYPE,
            "idName": "Adhaar",
            "issuer": {
                "name": "UIDAI",
                "publicKey": account.address,
                "logo": get_image_base64_by_path(settings.ADHAAR_LOGO)
            },
            "groups": [
                {
                    "data": {
                        "groupName": "photo_blood_type",
                        "attributes": {
                            "Passport Photo": {
                                "type": "image",
                                "value": get_image_base64(request.photograph),
                            },
                            "Blood Type": {
                                "type": "string",
                                "value": request.blood_type,
                            }
                        },
                    }
                },
                {
                    "data": {
                        "groupName": "name_dob",
                        "attributes": {
                            "First Name": {
                                "type": "string",
                                "value": request.first_name,
                            },
                            "Last Name": {
                                "type": "string",
                                "value": request.last_name,
                            },
                            "DOB": {
                                "type": "string",
                                "value": request.dob.isoformat(),
                            }
                        },
                    }
                },
                {
                    "data": {
                        "groupName": "address",
                        "attributes": {
                            "Address": {
                                "type": "string",
                                "value": request.address,
                            }
                        }
                    }
                },
                {
                    "data": {
                        "groupName": "unique_id",
                        "attributes": {
                            "UID": {
                                "type": "string",
                                "value": uuid4().hex
                            }
                        }
                    }
                }
            ]
        },
    }
    # Add missing date to each attribute group
    subject = {
        "publicKey": request.sign_challenge.pubkey,
    }
    issuer = {
        "publicKey": account.address
    }
    issued_at = datetime.now().isoformat()
    
    for group in id["data"]["groups"]:
        group["data"]["subject"] = subject
        group["data"]["issuer"] = issuer
        group["data"]["issuedAt"] = issued_at
        group["data"]["expiresAt"] = ""
        group["data"]["idType"] = settings.ADHAAR_ID_TYPE
        group["signature"] = sign_json(account, group["data"])

    id["signature"] = sign_json(account, id["data"])

    # Write id to json file
    validate_json_id(id)
    fss = FileSystemStorage()
    with fss.open(f"adhaar_{uuid4().hex}.json", "w") as f:
        json.dump(id, f)
        return fss.url(os.path.split(f.name)[1])
