import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserInfo } from 'src/user-info/entities/user-info.entity';
import { MedicInfo } from 'src/medic-info/entities/medic-info.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  @OneToOne(() => UserInfo, (userInfo) => userInfo.user, { cascade: true })
  userInfo: UserInfo;

  @OneToOne(() => MedicInfo, (medicInfo) => medicInfo.user, { cascade: true })
  medicInfo: MedicInfo;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
