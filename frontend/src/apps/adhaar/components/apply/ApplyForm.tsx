import React, { useRef } from 'react';
import {
  Form, Formik, FormikProps, FormikValues,
} from 'formik';
import { Box, Button } from '@mui/material';

import AdhaarService from 'apps/adhaar/services/AdhaarService';
import ErrorMessage from 'common/components/formik/ErrorMessage';
import FormikTextField from 'common/components/formik/FormikTextField';
import FormikUpload from 'common/components/formik/FormikUpload';
import redirectToWalletSigning from 'common/utils/redirectToWalletSigning';

const adhaarService = new AdhaarService();
const ApplyForm: React.FC = () => {
  const photoRef = useRef<File | null>(null);

  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        blood_type: '',
        dob: '',
        address: '',
        photograph: 'dummy',
      }}
      onSubmit={async (values) => {
        try {
          const response = await adhaarService.apply({
            ...values,
            photograph: photoRef.current as File,
          });
          const { content, id } = response.data.sign_challenge;
          redirectToWalletSigning(content, id);
        } catch (e: any) {
          alert(`Could not make adhaar request: ${e.message}`);
        }
      }}
      validate={async (values) => {
        const errors: { [key: string]: string } = {};

        Object.entries(values).forEach(([key, value]) => {
          if (value.trim().length < 1) errors[key] = `${key} is required.`;
        });

        if (photoRef.current === null) {
          errors.photograph = 'Photograph is required.';
        }
        return errors;
      }}
    >
      {({ isSubmitting }: FormikProps<FormikValues>) => (
        <Form style={{ width: '100%' }}>
          <FormikTextField
            type="input"
            name="first_name"
            placeholder="First Name"
            size="small"
          />
          <ErrorMessage name="first_name" />
          <FormikTextField
            type="input"
            name="last_name"
            placeholder="Last Name"
            size="small"
          />
          <ErrorMessage name="last_name" />
          <FormikTextField
            type="input"
            name="dob"
            placeholder="DOB (YYYY-MM-DD)"
            size="small"
          />
          <ErrorMessage name="dob" />
          <FormikTextField
            type="text"
            name="address"
            placeholder="Address"
            size="small"
          />
          <ErrorMessage name="address" />
          <FormikTextField
            type="input"
            name="blood_type"
            placeholder="Blood Group"
            size="small"
            maxLength={2}
          />
          <ErrorMessage name="blood_type" />
          <FormikUpload
            name="photograph"
            placeholder="Photograph"
            fileRef={photoRef}
            accept="image/*"
          />
          <ErrorMessage name="photograph" />
          <Box
            sx={{
              marginY: 2,
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ApplyForm;
