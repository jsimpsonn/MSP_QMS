"use client";

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  "document-title": Yup.string().required('Required'),
  "purpose-of-change": Yup.string().required('Required'),
  "items-requiring-change": Yup.string().required('Required'),
  "are-other-controlled-documents-affected-by-this-revision": Yup.array(),
  "what-other-controlled-documents-require-change": Yup.string(),
});

export function ChangeRequestForm() {
  const [submissionId, setSubmissionId] = React.useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    // Here, you would typically make a server-side request to submit the form.
    // Once the form is successfully submitted, you can set the submissionId.
    setSubmissionId('12345'); // Replace '12345' with the actual submission Id.
    setSubmitting(false);
  };

  if (submissionId) {
    return <p className="text-green-500">Thank you! Submission Id: {submissionId}</p>;
  }

  return (
    <Formik
      initialValues={{
        "document-title": "",
        "purpose-of-change": "",
        "items-requiring-change": "",
        "are-other-controlled-documents-affected-by-this-revision": [],
        "what-other-controlled-documents-require-change": ""
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          
          <div className="mb-4">
            <label htmlFor="document-title" className="block text-gray-700 text-sm font-bold mb-2">
              Document Title
            </label>
            <Field as="select" id="document-title" name="document-title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select an option</option>
              {/* Here, you would typically map over an array of options to populate the select field. */}
            </Field>
            <ErrorMessage name="document-title" component="div" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="purpose-of-change" className="block text-gray-700 text-sm font-bold mb-2">
              Purpose of Change
            </label>
            <Field as="textarea" id="purpose-of-change" name="purpose-of-change" className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" />
            <ErrorMessage name="purpose-of-change" component="div" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="items-requiring-change" className="block text-gray-700 text-sm font-bold mb-2">
              Items Requiring Change
            </label>
            <Field as="textarea" id="items-requiring-change" name="items-requiring-change" className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" />
            <ErrorMessage name="items-requiring-change" component="div" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="what-other-controlled-documents-require-change" className="block text-gray-700 text-sm font-bold mb-2">
              What other controlled documents require change?
            </label>
            <Field as="select" id="what-other-controlled-documents-require-change" name="what-other-controlled-documents-require-change" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select an option</option>
              {/* Here, you would typically map over an array of options to populate the select field. */}
            </Field>
            <ErrorMessage name="what-other-controlled-documents-require-change" component="div" className="text-red-500 text-xs italic" />
          </div>

          <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ChangeRequestForm;
