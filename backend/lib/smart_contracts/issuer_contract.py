import json
import typing
from hashlib import sha256

from web3 import Web3
from hexbytes import HexBytes


class IssuerContract:
    def __init__(self, w3: Web3, abi_path: str, address: str):
        with open(abi_path, "r") as f:
            abi = json.load(f)["abi"]
        self.contract = w3.eth.contract(address, abi=abi)

    def verify_json_signature(self, data: typing.Any, signature: str, id_type: str) -> bool:
        data_ = json.dumps(data, separators=(",", ":")).encode("utf-8")
        message = sha256(data_).digest().hex()
        return self.verify_signature(message, signature, id_type)

    def verify_signature(self, message: str, signature: str, id_type: str) -> bool:
        return self.contract.functions.verifySignature(
            HexBytes(message),
            HexBytes(signature),
            HexBytes(id_type),
        ).call()
