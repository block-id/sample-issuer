import React from 'react';
import { FieldAttributes, useField } from 'formik';
import { Button } from '@mui/material';

const FomrikUpload: React.FC<
FieldAttributes<{}> & React.HTMLProps<HTMLInputElement>
> = ({ ...props }) => {
  const [field] = useField<{}>(props);

  return (
    <Button variant="contained" component="label">
      <input type="file" {...props} />
    </Button>
  );
};

export default FomrikUpload;
