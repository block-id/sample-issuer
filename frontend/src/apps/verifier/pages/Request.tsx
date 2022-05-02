import {
  Box, Button, Checkbox, FormControlLabel, Typography,
} from '@mui/material';
import React, { useRef } from 'react';

import VerifierService from 'apps/verifier/services/VerifierService';

const verifierService = new VerifierService();
// Hard coded request form for Adhaar
const Request: React.FC = () => {
  const selectedGroups = useRef<string[]>([]);
  const GROUPS = [
    ['name_dob', 'Name & DOB'],
    ['photograph_blood_type', 'Photograph & Blood type'],
    ['address', 'Address'],
    ['unique_id', 'Unique ID'],
  ];
  const ADHAAR_ID_TYPE = '9d069a3c410c4441a92b5d4e5e1ea9ca';

  const handleCreate = async () => {
    try {
      const response = await verifierService.createRequest({
        id_type: ADHAAR_ID_TYPE,
        attribute_groups: [...selectedGroups.current],
      });
      console.log(response.data);
    } catch (e: any) {
      alert(`Could not make verifier request: ${e.message}`);
    }
  };

  return (
    <>
      <Typography variant="h5">Create an Adhaar Verification Request</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 2,
      }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        >
          {GROUPS.map(([group, label]) => (
            <FormControlLabel
              key={group}
              control={(
                <Checkbox onChange={(event) => {
                  if (event.target.checked) {
                    selectedGroups.current.push(group);
                  } else {
                    selectedGroups.current = selectedGroups.current.filter(
                      (x) => x !== group,
                    );
                  }
                }}
                />
            )}
              label={label}
            />
          ))}
        </Box>
        <Button variant="contained" onClick={handleCreate}>Create</Button>
      </Box>
    </>
  );
};

export default Request;
