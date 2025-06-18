export type LabelConfig = {
    region?: string;
    currency?: string;
    features?: { [key: string]: boolean };
  };
  
  export type LabelData = {
    id: BANKING_LABELS;
    name: string;
    config: LabelConfig;
  };
  
  export type TenantData = {
    id: string;
      name: string;
      createdAt: string;
    branding: {
      logoUrl: string;
      primaryColor: string;
    };
    accessRules: {
      roles: string[];
      features: { [key: string]: boolean };
    };
    labels: LabelData[];
  };


  export enum BANKING_LABELS {
    Retail = 'retail',
     Corporate = "corporate",
   Wealth = "wealth",
    Investment = "investment",
    Mortgage = "mortgage"
  }