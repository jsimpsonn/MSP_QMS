"use client";

import React, { useEffect, useMemo } from "react";
import Uppy, { UploadedUppyFile, UploadResult } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import { supabase } from "@/lib/supabaseClient";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const UppyDashboard: React.FC = () => {
  const uppy = useMemo(() => new Uppy({
    autoProceed: false,
    restrictions: {
      maxFileSize: null,
      maxNumberOfFiles: 10,
      minNumberOfFiles: 1,
    },
  }), []);

  useEffect(() => {
    const handleUploadSuccess = async (
      file: UploadedUppyFile<unknown, unknown>,
      response: UploadResult<unknown, unknown>
    ) => {
      if (!file || !file.data) {
        console.error('File is undefined or has no data.');
        return;
      }

      const { data, error } = await supabase.storage
        .from('your-bucket-name')
        .upload(`uploads/${file.name}`, file.data, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Upload error:', error);
      } else {
        console.log('File uploaded:', data);
      }
    };

    uppy.on('upload-success', handleUploadSuccess);

    return () => {
      uppy.off('upload-success', handleUploadSuccess);
      uppy.close();
    };
  }, [uppy]);

  return (
    <div className="uppy-dashboard-container">
      <Dashboard uppy={uppy} />
    </div>
  );
};

export default UppyDashboard;
