import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserInfo } from 'src/user-info/entities/user-info.entity';
import { MedicInfo } from 'src/medic-info/entities/medic-info.entity';
import { AssistantInfo } from 'src/assistant-info/entities/assistant-info.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

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

  @OneToOne(() => AssistantInfo, (assistantInfo) => assistantInfo.user, {
    cascade: true,
  })
  assistantInfo: AssistantInfo;

  @OneToOne(() => AssistantInfo, (assistantInfo) => assistantInfo.medic, {
    cascade: true,
  })
  assistant: AssistantInfo;

  @OneToMany(() => Patient, (patient) => patient.medic)
  patient: Patient[];

  @OneToMany(() => Appointment, (appointment) => appointment.medic)
  appointments: Appointment[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
