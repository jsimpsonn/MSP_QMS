"use client";

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  "title-of-new-document": Yup.string().required('Required'),
  "purpose-of-document-creation": Yup.string().required('Required'),
  "what-departments-will-use-the-document": Yup.array().min(1, 'Select at least one department'),
  "have-you-drafted-a-copy-of-the-requested-document": Yup.array(),
});

export function NewDocumentRequestForm() {
  const [submissionId, setSubmissionId] = React.useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate a server-side submission process
    console.log(values);
    setSubmissionId('12345'); // Replace '12345' with the actual submission Id.
    setSubmitting(false);
  };

  if (submissionId) {
    return <p className="text-green-500">Thank you! Submission Id: {submissionId}</p>;
  }

  return (
    <Formik
      initialValues={{
        "title-of-new-document": "",
        "purpose-of-document-creation": "",
        "what-departments-will-use-the-document": [],
        "have-you-drafted-a-copy-of-the-requested-document": []
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

          <div className="mb-4">
            <label htmlFor="title-of-new-document" className="block text-gray-700 text-sm font-bold mb-2">
              Title of New Document
            </label>
            <Field name="title-of-new-document" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            <ErrorMessage name="title-of-new-document" component="div" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="purpose-of-document-creation" className="block text-gray-700 text-sm font-bold mb-2">
              Purpose of Document Creation
            </label>
            <Field as="textarea" name="purpose-of-document-creation" className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" />
            <ErrorMessage name="purpose-of-document-creation" component="div" className="text-red-500 text-xs italic" />
          </div>

          <div className="mb-4">
            <label htmlFor="what-departments-will-use-the-document" className="block text-gray-700 text-sm font-bold mb-2">
              What Departments Will Use the Document?
            </label>
            <Field as="select" name="what-departments-will-use-the-document" multiple className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={event => {
              const options = event.target.options;
              const value = [];
              for (let i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                  value.push(options[i].value);
                }
              }
              setFieldValue("what-departments-will-use-the-document", value);
            }}>
              <option value="Accounting/Finance">Accounting/Finance</option>
              <option value="Cut to Length">Cut to Length</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Order Entry">Order Entry</option>
              <option value="Packaging">Packaging</option>
              <option value="Purchasing">Purchasing</option>
              <option value="Quality Assurance">Quality Assurance</option>
              <option value="Receiving">Receiving</option>
              <option value="Shipping">Shipping</option>
              <option value="Slitting">Slitting</option>
              <option value="Top Management">Top Management</option>
              <option value="Training">Training</option>
              <option value="Utility">Utility</option>
            </Field>
            <ErrorMessage name="what-departments-will-use-the-document" component="div" className="text-red-500 text-xs italic" />
          </div>

          <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewDocumentRequestForm;
