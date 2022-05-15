import React, { useEffect, useState } from 'react';

import VerifierService from 'apps/verifier/services/VerifierService';
import { getQueryParam } from 'common/utils/queryParams';
import { Box, Button, Typography } from '@mui/material';
import { ADHAAR_ID_TYPE } from 'common/utils/constatns';
import { getWalletCreateVpUrl } from 'common/utils/walletUrls';

const verifierService = new VerifierService();
const Home: React.FC = () => {
  const token = getQueryParam('loginToken');
  const requestId = getQueryParam('id');
  const [vp, setVp] = useState<VerifiablePresentation | undefined>();

  useEffect(() => {
    if (token?.trim().length === 0 || requestId === null) return;

    verifierService.getRequestVp(
      parseInt(requestId as string), token as string,
    ).then((response) => {
      setVp(response.data.verifiable_presentation);
    }).catch((err) => {
      console.error(err);
      alert('Could not fetch verifiable presentation');
    });
  }, [token, requestId]);

  const handleLogin = async () => {
    let verifierRequestId: number | undefined;

    // Create verifier request
    try {
      verifierRequestId = (await verifierService.createRequest({
        id_type: ADHAAR_ID_TYPE,
        attribute_groups: ['name_dob', 'photo_blood_type'],
      })).data.id;
    } catch (e: any) {
      alert(`Could not make verifier request: ${e.message}`);
    }

    // Redirect to wallet with request payload
    let walletPayload: VerifierRequestWalletPayload | undefined;

    try {
      walletPayload = (await verifierService.getRequest(verifierRequestId as number)).data;
    } catch (e: any) {
      alert(`Could not fetch verifer request payload: ${e.message}`);
    }

    if (walletPayload !== undefined) {
      window.location.assign(
        getWalletCreateVpUrl(walletPayload),
      );
    }
  };

  return (
    <>
      <Typography variant="h5">SSO Demo</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        textAlign: 'center',
      }}
      >
        {vp === undefined ? (
          <>
            <Typography variant="body1">You are not logged in.</Typography>
            <Button variant="contained" onClick={handleLogin}>Login With Adhaar</Button>
          </>
        ) : <p>hi</p>}
      </Box>
    </>
  );
};

export default Home;
