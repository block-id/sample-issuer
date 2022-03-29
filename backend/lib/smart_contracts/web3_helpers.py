from web3 import Web3


def get_web3_http_provider(url: str) -> Web3:
    return Web3(Web3.HTTPProvider(url))
