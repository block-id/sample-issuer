import React, {
  useEffect, createContext, useState, useContext,
} from 'react';

import { getQueryParam } from 'common/utils/queryParams';
import VerifierService from 'apps/verifier/services/VerifierService';

const WrapperContext = createContext<VpWrapperContext | undefined>(undefined);

const verifierService = new VerifierService();
const VpRedirectWrapper: React.FC = ({ children }) => {
  const token = getQueryParam('token');
  const requestId = getQueryParam('id');
  const [vp, setVp] = useState<VerifiablePresentation | undefined>();

  useEffect(() => {
    if (token === null || token?.trim().length === 0 || requestId === null) return;

    verifierService.getRequestVp(
      parseInt(requestId as string), token as string,
    ).then((response) => {
      setVp(response.data.verifiable_presentation);
    }).catch((err) => {
      console.error(err);
      alert('Could not fetch verifiable presentation');
    });
  }, [token, requestId]);

  return <WrapperContext.Provider value={{ vp }}>{children}</WrapperContext.Provider>;
};

const useVp = (): VpWrapperContext => useContext(WrapperContext) as VpWrapperContext;

export default VpRedirectWrapper;
export { useVp };
