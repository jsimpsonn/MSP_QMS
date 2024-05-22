"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import KpiTable from '@/components/KpiTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListFilter, File, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function KpiPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [recordableFilter, setRecordableFilter] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('Safety') // Ensure this is the correct table name
        .select('"Date", "Description", "Recordable"'); // Use double quotes for column names
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched data:', data); // Log the fetched data
        setData(data);

        // Extract unique years from the Date column
        const uniqueYears = Array.from(new Set(data.map((item: any) => new Date(item.Date).getFullYear().toString())));
        setYears(uniqueYears);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter data based on the selected year and recordable status
  const filteredData = data.filter((item: any) => {
    const yearMatches = selectedYear === 'all' || new Date(item.Date).getFullYear().toString() === selectedYear;
    const recordableMatches = recordableFilter === 'all' || (recordableFilter === 'yes' && item.Recordable) || (recordableFilter === 'no' && !item.Recordable);
    return yearMatches && recordableMatches;
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all" onValueChange={setSelectedYear}>
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              {years.map((year) => (
                <TabsTrigger key={year} value={year}>{year}</TabsTrigger>
              ))}
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Recordable</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked={recordableFilter === 'all'} onCheckedChange={() => setRecordableFilter('all')}>
                    All
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={recordableFilter === 'yes'} onCheckedChange={() => setRecordableFilter('yes')}>
                    Yes
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked={recordableFilter === 'no'} onCheckedChange={() => setRecordableFilter('no')}>
                    No
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Safety Incidents</CardTitle>
                <CardDescription>
                  All
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KpiTable data={filteredData} />
              </CardContent>
            </Card>
          </TabsContent>
          {years.map((year) => (
            <TabsContent key={year} value={year}>
              <Card>
                <CardHeader>
                  <CardTitle>Safety Incidents</CardTitle>
                  <CardDescription>
                    {year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <KpiTable data={filteredData} />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
