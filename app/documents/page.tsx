import React from "react";
import UppyDashboard from "@/components/UppyDashboard";

const UppyPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Uppy File Upload</h1>
      <UppyDashboard />
    </div>
  );
};

export default UppyPage;
