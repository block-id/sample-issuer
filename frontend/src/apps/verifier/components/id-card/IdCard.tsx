import React from 'react';
import { Box } from '@mui/material';

import Card from './components/card/Card';

const IdCard: React.FC<IdCardProps> = ({ verifiable_id }) => (
  <Box
    sx={(theme) => ({
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: theme.spacing(2),
      alignItems: 'center',
    })}
  >
    <Card id={verifiable_id} />
  </Box>
);

export default IdCard;
