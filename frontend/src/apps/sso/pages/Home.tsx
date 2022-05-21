import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import VerifierService from 'apps/verifier/services/VerifierService';
import { ADHAAR_ID_TYPE } from 'common/utils/constatns';
import { getWalletCreateVpUrl } from 'common/utils/walletUrls';
import VpRedirectWrapper, { useVp } from 'apps/verifier/components/VpRedirectWrapper';
import IdCard from 'apps/verifier/components/id-card/IdCard';

const verifierService = new VerifierService();
const Home: React.FC = () => {
  const { vp } = useVp();

  const handleLogin = async () => {
    let verifierRequestId: number | undefined;

    // Create verifier request
    try {
      verifierRequestId = (await verifierService.createRequest({
        id_type: ADHAAR_ID_TYPE,
        attribute_groups: ['name_dob', 'photo_blood_type'],
        redirectUrl: `${window.location.origin}/verifiers/sso-example/`,
      })).data.id;
    } catch (e: any) {
      alert(`Could not make verifier request: ${e.message}`);
      console.error(e);
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

  const firstName = vp?.data?.id?.groups?.filter(
    (g) => g.data.groupName === 'name_dob',
  )[0]?.data?.attributes['First Name'].value;

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
        ) : (
          <>
            <Typography variant="body1">Login success! Welcome, {firstName}!</Typography>
            <IdCard verifiable_id={vp.data.id} />
          </>
        )}
      </Box>
    </>
  );
};

const HomeWrapper: React.FC = () => <VpRedirectWrapper><Home /></VpRedirectWrapper>;

export default HomeWrapper;
