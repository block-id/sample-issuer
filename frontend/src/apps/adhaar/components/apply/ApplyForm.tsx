import React from 'react';
import { Form, Formik } from 'formik';

import AdhaarService from 'apps/adhaar/services/AdhaarService';
import ErrorMessage from 'common/components/formik/ErrorMessage';
import FormikTextField from 'common/components/formik/FormikTextField';
import FormikUpload from 'common/components/formik/FormikUpload';

const adhaarService = new AdhaarService();
const ApplyForm: React.FC = () => {
  const handleSubmit = async (values: AdhaarFormData) => {
    console.log(values);
  };

  const validate = async (values: AdhaarFormData) => {
    const errors: { [key: string]: string } = {};

    Object.entries(values).forEach(([key, value]) => {
      let appendError = false;

      if (typeof value === 'string') {
        if (key !== 'photograph') return;
        if (value.trim().length < 1) appendError = true;
      }
      if (value === null) appendError = true;

      if (appendError) errors[key] = `${key} is required.`;
    });

    return errors;
  };

  return (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        blood_type: '',
        dob: '',
        address: '',
        photograph: null,
      }}
      onSubmit={handleSubmit}
      validate={validate}
    >
      <Form>
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
        />
        <ErrorMessage name="blood_type" />
        <FormikUpload name="photograph" placeholder="Photograph" />
        <ErrorMessage name="photograph" />
      </Form>
    </Formik>
  );
};

export default ApplyForm;
