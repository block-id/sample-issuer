import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => (
  <>
    <Typography variant="h4">Issuer/Verifier Demo</Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        color="info"
        component={RouterLink}
        to="/issuers/adhaar"
      >
        Adhaar
      </Button>
      <Button
        variant="outlined"
        color="info"
        component={RouterLink}
        to="/verifiers/adhaar-request"
      >
        Sample Verifier
      </Button>
      <Button
        variant="outlined"
        color="info"
        component={RouterLink}
        to="/verifiers/sso-example"
      >
        Single Sign On
      </Button>
    </Box>
  </>
);

export default Home;
