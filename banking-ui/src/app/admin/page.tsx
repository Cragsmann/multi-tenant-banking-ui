import type { Metadata } from 'next';
import { AdminDashboard } from './dashboard';
import { rootDomain } from '@/lib/utils';
import { getAllTenants } from '@/lib/data';

export const metadata: Metadata = {
  title: `Admin Dashboard | ${rootDomain}`,
  description: `Manage subdomains for ${rootDomain}`
};

export default async function AdminPage() {
  // TODO: You can add authentication here with your preferred auth provider
  const tenants = await getAllTenants();
  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <AdminDashboard tenants={tenants} />
    </div>
  );
}
