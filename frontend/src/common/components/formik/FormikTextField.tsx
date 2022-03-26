import React from 'react';
import { FieldAttributes, useField } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

const FormikTextField: React.FC<FieldAttributes<{}> & TextFieldProps> = ({ ...props }) => {
  const [field] = useField<{}>(props);

  return (
    <TextField
      margin="normal"
      fullWidth
      variant="outlined"
      {...field}
      {...props}
    />
  );
};

export default FormikTextField;
