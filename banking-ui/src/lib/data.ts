import { Redis } from "@upstash/redis";
import { LabelData, TenantData } from "./types";

export const redis = Redis.fromEnv();

export async function getTenantData(subdomain: string) {
  return await redis.hgetall<TenantData>(`tenant:${subdomain}`);
}

export async function getLabelData(subdomain: string, label: string) {
  return await redis.hgetall<LabelData>(`tenant:${subdomain}:label:${label}`);
}
export async function getAllTenants() {
    const keys = await redis.keys('tenant:*');
  
    if (!keys.length) {
      return [];
    }
  
    const values = await redis.mget<TenantData[]>(...keys);
  
    return keys.map((key, index) => {
      const name = key.replace('tenant:', '');
      const data = {...values[index], name };
  
      return data     
    });
}
  

  
