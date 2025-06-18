// 2️⃣ app/[tenant]/[label]/page.tsx
import { notFound } from "next/navigation";
import { TenantProvider, LabelProvider } from "@/app/providers/TenantProvider";
import TenantPageContent from "./TenantPageContent";
import { getLabelData, getTenantData } from "@/lib/data";

export default async function SubdomainPage({
  params,
}: {
  params: { tenant: string; label: string };
}) {
  const { tenant, label } = params;

  const tenantData = await getTenantData(tenant);
  if (!tenantData) notFound();

  const labelData = await getLabelData(tenant, label);
  if (!labelData) notFound();

  return (
    <TenantProvider tenant={tenantData}>
      <LabelProvider label={labelData}>
        <TenantPageContent />
      </LabelProvider>
    </TenantProvider>
  );
}
