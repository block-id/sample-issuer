import { WALLET_SIGNING_URL } from './walletUrls';

function redirectToWalletSigning(payload: string, challengeId: number): void {
  const { host } = window.location;
  const redirectUrl = `http://${host}/sign-challenge/${challengeId}/`;
  window.location.assign(`${WALLET_SIGNING_URL}?payload=${payload}&redirect=${redirectUrl}`);
}

export default redirectToWalletSigning;
