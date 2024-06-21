import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class BusinessProfileDto {
  @IsObject()
  @IsOptional()
  user: object;

  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  businessPhoneNo: string;

  @IsString()
  @IsNotEmpty()
  alternatePhoneNo: string;

  @IsNotEmpty()
  @IsString()
  businessAddress: string;

  @IsNotEmpty()
  @IsString()
  businessBranch1: string;

  @IsNotEmpty()
  @IsString()
  businessBranch2: string;

  @IsNotEmpty()
  @IsString()
  pcnLicense: string;

  @IsNotEmpty()
  @IsString()
  cacDocument: string;

  @IsString()
  @IsNotEmpty()
  vendorType: string;

  @IsString()
  @IsNotEmpty()
  openingHours: string;
}
