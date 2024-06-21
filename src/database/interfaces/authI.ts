import { Exclude } from 'class-transformer';

export enum AccountTypeEnum {
  FOUNDER = 'FOUNDER',
  CREATIVE = 'CREATIVE',
  VENDOR = 'VENDOR',
  INVESTOR = 'INVESTOR',
}

export enum VerificationStatusEnum {
  UNVERIFIED = 'unverified',
  VERIFIED = 'verified',
}

export class AuthRegisterI {
  email: string;

  @Exclude()
  password: string;

  firstName: string;

  message: string;

  lastName: string;

  phoneNo: string;

  alternativePhoneNo: string;

  address: string;

  accountType: AccountTypeEnum;

  VerificationStatus: VerificationStatusEnum;

  accessToken: string;

  refreshToken: string;
}
