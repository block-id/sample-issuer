from datetime import datetime

from jsonschema import validate

from .schema import json_id_schema


def validate_semantics(json):
    ISSUER_PUBLIC_KEY = json["data"]["issuer"]["publicKey"]
    SUBJECT_PUBLIC_KEY = json["data"]["groups"][0]["data"]["subject"]["publicKey"]
    ID_TYPE = json["data"]["idType"]

    # Validate attribute groups
    for group in json["data"]["groups"]:
        # Key validation
        assert (
            group["data"]["issuer"]["publicKey"] == ISSUER_PUBLIC_KEY
        ), "Issuer public key mismatch"
        assert (
            group["data"]["subject"]["publicKey"] == SUBJECT_PUBLIC_KEY
        ), "Subject public key mismatch"

        # ID type validation
        assert (
            group["data"]["idType"] == ID_TYPE
        ), f"Attribute group {group['groupName']} idType mismatch"

        # Datetime validation
        issued_at = group["data"]["issuedAt"]
        expires_at = group["data"]["expiresAt"]

        if issued_at:
            issued_at = datetime.fromisoformat(issued_at)
        if expires_at:
            expires_at = datetime.fromisoformat(expires_at)

        if issued_at and expires_at:
            assert expires_at > issued_at, "Invalid issuance and expiry datetime"


def validate_json_id(json):
    # Validate schema
    validate(instance=json, schema=json_id_schema)
    validate_semantics(json)
