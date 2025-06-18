'use server';

import { redis } from '@/lib/data';
import { protocol, rootDomain } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTenantAction(
  prevState: any,
  formData: FormData
) {
  const tenant = formData.get('tenant') as string;
  const color = formData.get('color') as string;
  const logoUrl = formData.get('logoUrl') as string | null;

  if (!tenant || !color) {
    return { success: false, error: 'Tenant and color are required' };
  }

  const sanitizedTenant = tenant.toLowerCase().replace(/[^a-z0-9-]/g, '');

  if (sanitizedTenant !== tenant) {
    return {
      tenant,
      color,
      logoUrl: logoUrl || undefined,
      success: false,
      error:
        'Tenant can only have lowercase letters, numbers, and hyphens. Please try again.',
    };
  }

  const tenantAlreadyExists = await redis.get(`tenant:${sanitizedTenant}`);
  if (tenantAlreadyExists) {
    return {
      tenant,
      color,
      logoUrl: logoUrl || undefined,
      success: false,
      error: 'This tenant is already taken',
    };
  }

  // Save data in Redis (logoUrl optional)
  await redis.set(`tenant:${sanitizedTenant}`, JSON.stringify({
    color,
    logoUrl: logoUrl || null,
    createdAt: Date.now(),
  }));

  redirect(`${protocol}://${sanitizedTenant}.${rootDomain}`);
}

export async function deleteTenantAction(
  prevState: any,
  formData: FormData
) {
  const tenant = formData.get('tenant');
  await redis.del(`tenant:${tenant}`);
  revalidatePath('/admin');
  return { success: 'Domain deleted successfully' };
}





