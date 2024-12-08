import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hotels')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  coordinate: string;

  @Column()
  status: number;
}