import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/auth/entities/user.entity';

@Entity('assistant-info')
export class AssistantInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  checkIn: string;

  @Column('text')
  checkOut: string;

  @Column('text', { array: true })
  days: string[];

  @OneToOne(() => User, (user) => user.assistantInfo, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToOne(() => User, (user) => user.assistant, { onDelete: 'CASCADE' })
  @JoinColumn()
  medic: User;
}
