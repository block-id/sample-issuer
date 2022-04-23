import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { getAllParams } from 'common/utils/queryParams';
import ChallengeService from 'apps/sign-challenge/services/ChallengeService';
import { getWalletNewIdUrl } from 'common/utils/walletUrls';

const challengeService = new ChallengeService();
const Solve: React.FC = () => {
  const { id } = useParams();
  const { sign, publicKey } = getAllParams();

  const [idUrl, setIdUrl] = useState<string>();

  useEffect(() => {
    async function solveChallenge() {
      try {
        const response = await challengeService.solve(
          Number.parseInt(id as string), sign, publicKey,
        );
        setIdUrl(response.data.download_url);
      } catch (e: any) {
        console.error(e);
        alert(`Could not verify signature: ${e.response?.data?.toString()}`);
      }
    }
    solveChallenge();
  }, [id, sign, publicKey]);

  const handleAdd = () => {
    window.open(getWalletNewIdUrl(idUrl as string));
  };

  return idUrl
    ? <Button variant="contained" onClick={handleAdd}>Add ID To Wallet</Button>
    : <Typography variant="body1">Validating wallet signature...</Typography>;
};

export default Solve;
