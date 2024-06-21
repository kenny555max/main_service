import { AuthEntity } from '../entities/auth.entities';

export enum VendorType {
  RETAIL = 'Retail Pharmacy',
  WHOLE = 'Whole Pharmacy',
}

export interface BusinessProfileI {
  user: AuthEntity;
  businessName: string;
  businessPhoneNo: string;
  alternatePhoneNo: string;
  businessAddress: string;
  businessBranch1: string;
  businessBranch2: string;
  pcnLicense?: string;
  cacDocument?: string;
  vendorType: string;
  openingHours: string;
}
