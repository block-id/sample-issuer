import { WALLET_SIGNING_URL } from 'common/utils/constants';

function redirectToWalletSigning(payload: string, challengeId: number): void {
  const { host } = window.location;
  // We can't use the same host (in case of local) since cookies will be overwritten
  const hostMap: {[key: string]: string} = {
    localhost: '127.0.0.1',
    '127.0.0.1': 'localhost',
  };
  const newHost = hostMap[host] || '127.0.0.1';
  const redirectUrl = `http://${newHost}/sign-challenge/${challengeId}/`;
  window.location.href = `${WALLET_SIGNING_URL}?payload=${payload}&redirect=${redirectUrl}`;
}

export default redirectToWalletSigning;
