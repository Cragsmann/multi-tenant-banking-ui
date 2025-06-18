"use client";

import { createTenantAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { rootDomain } from "@/lib/utils";
import React, { useActionState, useState } from "react";
import { BANKING_LABELS } from "@/lib/types";

type CreateTenantState = {
  error?: string;
  success?: boolean;
  tenant?: string;
  color?: string;
  logoUrl?: string;
};

function TenantInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="tenant">Tenant</Label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            id="tenant"
            name="tenant"
            placeholder="your-tenant"
            value={value}
            onChange={onChange}
            className="w-full rounded-r-none focus:z-10"
            required
          />
        </div>
        <span className="bg-gray-100 px-3 border border-l-0 border-input rounded-r-md text-gray-500 min-h-[36px] flex items-center">
          .{rootDomain}
        </span>
      </div>
    </div>
  );
}

function ColorPicker({
  color,
  setColor,
  defaultValue,
}: {
  color: string;
  setColor: (color: string) => void;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="color">Theme Color</Label>
      <input
        type="color"
        id="color"
        name="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-16 h-10 p-0 border border-input rounded-md cursor-pointer"
        required
        aria-label="Select theme color"
      />
      <p className="text-xs text-gray-500">Pick a primary color for the tenant</p>
      <input type="hidden" name="color" value={color} />
    </div>
  );
}

function LogoUploader({
  logoUrl,
  setLogoUrl,
  defaultValue,
}: {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  defaultValue?: string;
}) {
  const [preview, setPreview] = useState(defaultValue || "");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setPreview(result);
        setLogoUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="logo">Upload Logo</Label>
      <div>
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          required
        />
        <label
          htmlFor="logo"
          className="inline-block cursor-pointer rounded-md border border-input bg-gray-100 py-2 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-200"
        >
          Select Image
        </label>
        {fileName && (
          <span className="ml-3 text-sm text-gray-600">{fileName}</span>
        )}
      </div>
      {preview && (
        <img
          src={preview}
          alt="Logo preview"
          className="mt-2 h-20 object-contain rounded border border-gray-300"
        />
      )}
      <input type="hidden" name="logoUrl" value={logoUrl} />
    </div>
  );
}

const BANKING_LABEL_OPTIONS = [
  { id: BANKING_LABELS.Retail, name: "Retail Banking" },
  { id: BANKING_LABELS.Corporate, name: "Corporate Banking" },
  { id: BANKING_LABELS.Wealth, name: "Wealth Management" },
  { id: BANKING_LABELS.Investment, name: "Investment Banking" },
  { id: BANKING_LABELS.Mortgage, name: "Mortgage Services" },
];

function LabelsSelector({
  selectedLabels,
  setSelectedLabels,
}: {
  selectedLabels: string[];
  setSelectedLabels: (labels: string[]) => void;
}) {
  const toggleLabel = (id: string) => {
    if (selectedLabels.includes(id)) {
      setSelectedLabels(selectedLabels.filter((label) => label !== id));
    } else {
      setSelectedLabels([...selectedLabels, id]);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Labels (Business Units)</Label>
      <div className="grid grid-cols-2 gap-2">
        {BANKING_LABEL_OPTIONS.map((label) => (
          <button
            type="button"
            key={label.id}
            onClick={() => toggleLabel(label.id)}
            className={`px-2 py-1 rounded border ${
              selectedLabels.includes(label.id)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {label.name}
          </button>
        ))}
      </div>
      <input type="hidden" name="labels" value={selectedLabels.join(",")} />
      <p className="text-xs text-gray-500">Select business units for this tenant</p>
    </div>
  );
}

export function CreateTenantForm() {
  const [tenant, setTenant] = useState("");
  const [color, setColor] = useState("#000000");
  const [logoUrl, setLogoUrl] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const [state, action, isPending] = useActionState<CreateTenantState, FormData>(
    createTenantAction,
    {}
  );

  const handleTenantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTenant(e.target.value);
  };

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tenant">Tenant Name</Label>
        <Input
          id="tenant"
          name="tenant"
          placeholder="Tenant Name"
          value={tenant}
          onChange={handleTenantChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Theme Color</Label>
        <input
          type="color"
          id="color"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-10 p-0 border border-input rounded-md cursor-pointer"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Upload Logo</Label>
        <input
          type="file"
          id="logo"
          name="logo"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onloadend = () => {
              if (typeof reader.result === "string") {
                setLogoUrl(reader.result);
              }
            };
            reader.readAsDataURL(file);
          }}
          required
        />
        <input type="hidden" name="logoUrl" value={logoUrl} />
        {logoUrl && <img src={logoUrl} alt="Logo Preview" className="mt-2 h-16" />}
      </div>

      <LabelsSelector selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} />

      {state?.error && <div className="text-sm text-red-500">{state.error}</div>}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Tenant"}
      </Button>
    </form>
  );
}
