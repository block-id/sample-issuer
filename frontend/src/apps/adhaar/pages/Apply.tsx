import { Typography } from '@mui/material';
import React from 'react';
import ApplyForm from '../components/apply/ApplyForm';

const Apply: React.FC<{isFake: boolean}> = ({ isFake }) => (
  <>
    <Typography variant="h5">Adhaar Form</Typography>
    <ApplyForm isFake={isFake} />
  </>
);

export default Apply;
