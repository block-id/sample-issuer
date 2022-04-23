const getWalletHost = (): string => {
  const { hostname } = window.location;
  // We can't use the same host (in case of) since cookies will be overwritten
  const hostMap: {[key: string]: string} = {
    localhost: '127.0.0.1',
    '127.0.0.1': 'localhost',
  };
  return hostMap[hostname] || '127.0.0.1';
};

const WALLET_BASE_URL = `http://${getWalletHost()}:8000/`;
const WALLET_SIGNING_URL = `${WALLET_BASE_URL}auth/sign/`;
const WALLET_NEW_ID_URL = `${WALLET_BASE_URL}new-id/`;

const getWalletNewIdUrl = (idUrl: string): string => `${WALLET_NEW_ID_URL}?idUrl=${idUrl}`;

export { WALLET_BASE_URL, WALLET_SIGNING_URL, getWalletNewIdUrl };
