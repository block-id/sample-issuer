import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import VerifierService from 'apps/verifier/services/VerifierService';
import { getWalletCreateVpUrl } from 'common/utils/walletUrls';

const veriferService = new VerifierService();
const ViewRequest: React.FC = () => {
  const { id } = useParams();
  const [request, setRequest] = useState<VerifierRequestWalletPayload | undefined>();

  useEffect(() => {
    veriferService.getRequest(parseInt(id as string))
      .then((response) => {
        setRequest(response.data);
      });
  }, [id]);

  const handleVerify = () => {
    window.location.assign(
      getWalletCreateVpUrl(request as VerifierRequestWalletPayload),
    );
  };

  return (
    <>
      <Typography variant="h5" align="center">Verifier request from {request?.requesterName}</Typography>
      <pre style={{ fontSize: '1.3em' }}>
        {JSON.stringify(request, undefined, 1)}
      </pre>
      <Button variant="contained" onClick={handleVerify}>Verify My ID</Button>
    </>
  );
};

export default ViewRequest;
