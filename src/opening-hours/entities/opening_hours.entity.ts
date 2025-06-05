// src/opening-hours/entities/opening-hour.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('opening_hours')
export class OpeningHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayOfWeek: string; // 'Monday', 'Tuesday', etc.

  @Column({ default: true })
  isOpen: boolean;

  @Column({ type: 'time', nullable: true })
  openTime: string;

  @Column({ type: 'time', nullable: true })
  closeTime: string;

  @Column({ type: 'time', nullable: true })
  lunchStart: string;

  @Column({ type: 'time', nullable: true })
  lunchEnd: string;
}
