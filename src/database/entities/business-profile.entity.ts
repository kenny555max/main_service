import { VendorType } from 'src/database/interfaces/business-profile';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthEntity } from './auth.entities';

@Entity()
export class BusinessProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => AuthEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  user: AuthEntity;

  @Column({ nullable: false, type: 'varchar' })
  businessName: string;

  @Column({ nullable: false, type: 'varchar' })
  businessPhoneNo: string;

  @Column({ nullable: false, type: 'varchar' })
  alternatePhoneNo: string;

  @Column({ nullable: false, type: 'varchar' })
  businessAddress: string;

  @Column({ nullable: false, type: 'varchar' })
  businessBranch1: string;

  @Column({ nullable: false, type: 'varchar' })
  businessBranch2: string;

  @Column({ nullable: true, type: 'varchar' })
  pcnLicense: string;

  @Column({ nullable: true, type: 'varchar' })
  cacDocument: string;

  @Column({
    type: 'enum',
    enum: VendorType,
    default: null,
    nullable: true,
  })
  vendorType: string;

  @Column({ nullable: false, type: 'varchar' })
  openingHours: string;
}
