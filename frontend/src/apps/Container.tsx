import React from 'react';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

const Container: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      marginTop: 10,
      maxWidth: '80%',
      marginX: 'auto',
    }}
  >
    <Outlet />
  </Box>
);

export default Container;
