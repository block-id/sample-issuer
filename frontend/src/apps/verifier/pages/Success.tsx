import React from 'react';
import { Box, Typography } from '@mui/material';

import VpRedirectWrapper, { useVp } from 'apps/verifier/components/VpRedirectWrapper';
import IdCard from '../components/id-card/IdCard';

const Success: React.FC = () => {
  const { vp } = useVp();
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
    >
      <Typography variant="h5">Your credentials have been successfuly verified!</Typography>
      {vp && <IdCard verifiable_id={vp.data.id} />}
    </Box>
  );
};

const SuccessWrapper: React.FC = () => <VpRedirectWrapper><Success /></VpRedirectWrapper>;

export default SuccessWrapper;
