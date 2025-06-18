
"use client";

import { LabelData, TenantData } from "@/lib/types";
import React, { createContext, useContext, ReactNode } from "react";



const TenantContext = createContext<TenantData | undefined>(undefined);
const LabelContext = createContext<LabelData | undefined>(undefined);

export const TenantProvider = ({ tenant, children }: { tenant: TenantData; children: ReactNode }) => {
  return <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>;
};

export const LabelProvider = ({ label, children }: { label: LabelData; children: ReactNode }) => {
  return <LabelContext.Provider value={label}>{children}</LabelContext.Provider>;
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) throw new Error("useTenant must be used within TenantProvider");
  return context;
};

export const useLabel = () => {
  const context = useContext(LabelContext);
  if (!context) throw new Error("useLabel must be used within LabelProvider");
  return context;
};
