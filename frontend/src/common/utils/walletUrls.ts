const getWalletHost = (): string => {
  const { hostname } = window.location;
  // We can't use the same localhost since cookies will be overwritten
  const hostMap: {[key: string]: string} = {
    localhost: '127.0.0.1',
    '127.0.0.1': 'localhost',
  };
  return hostMap[hostname] || '127.0.0.1';
};

const WALLET_BASE_URL = `http://${getWalletHost()}:8000/`;
const WALLET_SIGNING_URL = `${WALLET_BASE_URL}auth/sign/`;
const WALLET_NEW_ID_URL = `${WALLET_BASE_URL}new-id/`;
const WALLET_CREATE_VP_URL = `${WALLET_BASE_URL}create-vp/`;

const getWalletNewIdUrl = (idUrl: string): string => `${WALLET_NEW_ID_URL}?idUrl=${idUrl}`;

const getWalletCreateVpUrl = (payload: VerifierRequestWalletPayload) => {
  // Create base64 payload
  const walletPayload: any = { ...payload };
  walletPayload.idType = undefined;
  const payloadB64 = window.btoa(JSON.stringify(walletPayload));
  return `${WALLET_CREATE_VP_URL}?payload=${payloadB64}&type=${payload.idType}`;
};

export {
  WALLET_BASE_URL, WALLET_SIGNING_URL, WALLET_CREATE_VP_URL, getWalletNewIdUrl, getWalletCreateVpUrl,
};
