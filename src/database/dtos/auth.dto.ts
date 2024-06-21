import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import {
  AccountTypeEnum,
  VerificationStatusEnum,
} from 'src/database/interfaces/authI';

export class AuthRegisterDTO {
  @ApiProperty({ example: 'oyedepokehinde2016@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Ajenifuja' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Algomeji' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '+234 7065539202' })
  @IsPhoneNumber()
  @IsOptional()
  phoneNo: string;

  @ApiProperty({ example: '+234 9029111359' })
  @IsPhoneNumber()
  @IsOptional()
  alternativePhoneNo: string;

  @ApiProperty({ example: '29/31 alagomeji' })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ example: 'FOUNDER' })
  @IsString()
  @IsNotEmpty()
  accountType: AccountTypeEnum;

  @IsBoolean()
  @IsOptional()
  VerificationStatus: VerificationStatusEnum;

  @IsString()
  @IsOptional()
  accessToken: string;

  @IsString()
  @IsOptional()
  refreshToken: string;
}
