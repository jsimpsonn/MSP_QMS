'use client';

import React from 'react';
import { Dashboard } from '@uppy/react';
import Uppy from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const uppy = new Uppy({
  restrictions: {
    maxFileSize: 1000000, // 1MB
    maxNumberOfFiles: 5,
    minNumberOfFiles: 1,
    allowedFileTypes: ['image/*', 'video/*']
  }
});

uppy.use(AwsS3, {
  getUploadParameters: async (file) => {
    const response = await fetch('/api/documents/s3-params', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type
      })
    });

    const data = await response.json();

    return {
      method: data.method,
      url: data.url,
      fields: data.fields
    };
  }
});

uppy.on('complete', (result) => {
  console.log('Upload complete! Weve uploaded these files:', result.successful);
});

const UppyDashboard: React.FC = () => {
  return (
    <div>
      <h1>Uppy File Upload</h1>
      <Dashboard
        uppy={uppy}
        proudlyDisplayPoweredByUppy={false}
        width="100%"
        height="400px"
        note="Images and video files only, up to 1MB"
      />
    </div>
  );
};

export default UppyDashboard;
