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

  @Column('timestamp')
  checkIn: Date;

  @Column('timestamp')
  checkOut: Date;

  @Column('text', { array: true })
  days: string[];

  @OneToOne(() => User, (user) => user.assistantInfo, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToOne(() => User, (user) => user.assistant, { onDelete: 'CASCADE' })
  @JoinColumn()
  medic: User;
}
