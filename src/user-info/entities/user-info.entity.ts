import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/auth/entities/user.entity';

@Entity('user-info')
export class UserInfo {
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

  @OneToOne(() => User, (user) => user.userInfo, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
