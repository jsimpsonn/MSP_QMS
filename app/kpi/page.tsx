import KPIDashboard from 'components/KPIDashboard';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import PageTitle from '@/components/PageTitle';

export default function KPIPage() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>KPIs</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageTitle title="Key Performance Indicators" />
      <KPIDashboard />
    </div>
  );
}