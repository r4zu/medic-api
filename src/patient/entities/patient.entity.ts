import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
import { History } from 'src/history/entities/history.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  dniType: string;

  @Column('text', { unique: true })
  dni: string;

  @Column('text', { unique: true })
  email: string;

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

  @ManyToOne(() => User, (user) => user.patient, { onDelete: 'CASCADE' })
  medic: User;

  @OneToMany(() => History, (history) => history.patient, { cascade: true })
  history: History[];

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments: Appointment[];
}
