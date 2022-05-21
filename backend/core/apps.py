import logging

from django.apps import AppConfig
from django.conf import settings

from lib.smart_contracts.web3_helpers import get_web3_http_provider
from lib.smart_contracts.issuer_contract import IssuerContract

logging.basicConfig(level=logging.INFO)


def register_id_type_on_smart_contract():
    w3 = get_web3_http_provider(settings.WEB3_HTTP_PROVIDER)
    issuer_contract = IssuerContract(
        w3,
        settings.ISSUER_CONTRACT_ABI,
        settings.ISSUER_CONTRACT_ADDRESS,
    )
    issuer_contract.add_id_type(
        w3.eth.account.from_key(settings.ADHAAR_PRIVATE_KEY),
        settings.ADHAAR_ID_TYPE,
    )


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

    def ready(self) -> None:
        from core import singals

        register_id_type_on_smart_contract()
        logging.info("Added adhaar id type to smart contract.")
