"use client";

import { Card, CardTitle } from 'components/ui/card';
import { Separator } from 'components/ui/separator';

const KPIDashboard: React.FC = () => {
    return (
      <div className="container mx-auto px-2 min-h-screen">
      <h1 className="text-4xl font-bold">KPI Dashboard</h1>
      <section className="space-y-4 h-screen">
        <div className="flex flex-row gap-4 h-1/4">
          <Card className="flex flex-wrap w-1/2 h-full px-5 py-5 content-start gap-2">
            <CardTitle>Tonnage</CardTitle>
            <Separator />
          </Card>
          <Card className="flex flex-wrap w-1/2 h-full px-5 py-5 content-start gap-2">
            <CardTitle>OTD</CardTitle>
            <Separator />
          </Card>
        </div>
        <div className="flex flex-row gap-4 h-1/4">
        <Card className="flex flex-wrap w-1/2 h-full px-5 py-5 content-start gap-2">
          <CardTitle>Loading Times</CardTitle>
          <Separator />
        </Card>
        <Card className="flex flex-wrap w-1/2 h-full px-5 py-5 content-start gap-2">
          <CardTitle>Customer Concssions</CardTitle>
          <Separator />
        </Card>
      </div>
    </section>
    </div>
  );
};

export default KPIDashboard;
