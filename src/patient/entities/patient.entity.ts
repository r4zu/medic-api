import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  dniType: string;

  @Column('text', { unique: true })
  dni: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('date')
  dob: Date;

  @Column('text')
  phone: string;

  @Column('text')
  address: string;

  @Column('text')
  occupation: string;

  @Column('boolean', { default: false })
  isDeleted: boolean;
}
