import json
import typing
from hashlib import sha256
from eth_account import Account

from web3 import Web3
from hexbytes import HexBytes


class IssuerContract:
    def __init__(self, w3: Web3, abi_path: str, address: str):
        with open(abi_path, "r") as f:
            abi = json.load(f)["abi"]
        self.contract = w3.eth.contract(address, abi=abi)
        self.w3 = w3

    def verify_json_signature(
        self, data: typing.Any, signature: str, id_type: str
    ) -> bool:
        data_ = json.dumps(data, separators=(",", ":")).encode("utf-8")
        message = sha256(data_).digest().hex()
        return self.verify_signature(message, signature, id_type)

    def verify_signature(self, message: str, signature: str, id_type: str) -> bool:
        return self.contract.functions.verifySignature(
            HexBytes(message),
            HexBytes(signature),
            HexBytes(id_type),
        ).call()

    def add_id_type(self, account: Account, id_type: str) -> bool:
        transaction = self.contract.functions.addIdType(
            HexBytes(id_type)
        ).buildTransaction(
            {
                "gas": 70000,
                "gasPrice": self.w3.toWei(10, "gwei"),
                "from": account.address,
                "nonce": self.w3.eth.get_transaction_count(account.address),
            }
        )
        res = self.w3.eth.send_raw_transaction(
            account.sign_transaction(transaction).rawTransaction
        )
        return res
