import { CreateTenantForm } from '@/components/CreateTenantForm';
import { rootDomain } from '@/lib/utils';
import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 relative">
      <div className="absolute top-4 right-4">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Admin
        </Link>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {rootDomain}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Create your own tenant
          </p>
        </div>

        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <CreateTenantForm />
        </div>
      </div>
    </div>
  );
}
