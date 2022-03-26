import React from 'react';
import { ErrorMessage as FormikErrorMessage, ErrorMessageProps } from 'formik';
import { Typography } from '@mui/material';

const ErrorMessage: React.FC<Omit<ErrorMessageProps, 'component'>> = ({ ...errorMessageProps }) => (
  <FormikErrorMessage
    render={(msg) => <Typography variant="body1" color="red" fontSize="small">{msg}</Typography>}
    {...errorMessageProps}
  />
);

export default ErrorMessage;
