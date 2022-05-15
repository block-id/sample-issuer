import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Button, Checkbox, FormControlLabel, Typography,
} from '@mui/material';

import VerifierService from 'apps/verifier/services/VerifierService';
import { ADHAAR_ID_TYPE } from 'common/utils/constatns';

const verifierService = new VerifierService();
// Hard coded request form for Adhaar
const Request: React.FC = () => {
  const [requestId, setRequestId] = useState<number | undefined>();
  const selectedGroups = useRef<string[]>([]);
  const GROUPS = [
    ['name_dob', 'Name & DOB'],
    ['photo_blood_type', 'Photograph & Blood type'],
    ['address', 'Address'],
    ['unique_id', 'Unique ID'],
  ];

  const handleCreate = async () => {
    try {
      const response = await verifierService.createRequest({
        id_type: ADHAAR_ID_TYPE,
        attribute_groups: [...selectedGroups.current],
      });
      console.log(response.data);
      setRequestId(response.data.id);
    } catch (e: any) {
      alert(`Could not make verifier request: ${e.message}`);
    }
  };

  if (requestId !== undefined) {
    return (
      <>
        <Typography variant="h5">
          Verifier request issued. Share the following link with the customer:
        </Typography><br />
        <Typography variant="h5" align="center">
          <Link to={requestId.toString()}>
            {`${window.location.href}/${requestId}/`}
          </Link>
        </Typography>
      </>
    );
  }

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
