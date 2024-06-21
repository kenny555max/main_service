import {
  AccountTypeEnum,
  VerificationStatusEnum,
} from 'src/database/interfaces/authI';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  phoneNo: string;

  @Column({ nullable: true })
  alternativePhoneNo: string;

  @Column({ nullable: true })
  address: string;

  @Column({
    type: 'enum',
    enum: AccountTypeEnum,
    default: null,
    nullable: true,
  })
  accountType: AccountTypeEnum;

  @Column({
    type: 'enum',
    enum: VerificationStatusEnum,
    default: VerificationStatusEnum.UNVERIFIED,
  })
  verificationStatus: VerificationStatusEnum;

  @Column({ nullable: true, type: 'text' })
  accessToken: string;

  @Column({ nullable: true, type: 'text' })
  refreshToken: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
