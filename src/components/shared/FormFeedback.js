import React from 'react';
import { FormFeedback as BootstrapFormFeedback } from 'reactstrap';

export const FormFeedback = ({ errors, touched }) => {
  return <BootstrapFormFeedback>{errors && touched ? touched : null}</BootstrapFormFeedback>;
};

//formik.errors.firstName && formik.touched.firstName ? formik.errors.firstName : null
