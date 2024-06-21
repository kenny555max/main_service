import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entities';
import { Bid } from './bid.entities';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @CreateDateColumn()
  date_and_time_added: Date;

  @Column('int')
  available_qty: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  category: string;

  @Column()
  brand: string;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'float' })
  dimensions: string;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];

  @OneToMany(() => Bid, (bid) => bid.product)
  bids: Bid[];

  @UpdateDateColumn()
  updatedAt: Date;
}
