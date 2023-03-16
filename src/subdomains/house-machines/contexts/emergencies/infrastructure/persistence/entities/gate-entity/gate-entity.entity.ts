import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CloseGateEntity } from '../close-gate-entity/close-gate.entity';
import { OpenGateEntity } from '../open-gate-entity/open-gate.entity';

@Index('gate_primary_key', ['id'], { unique: true })
@Entity('gate', { schema: 'public' })
export class GateEntity {
  @Column('uuid', {
    primary: true,
    name: 'gate_id',
    default: () => 'uuid_generate_v4()',
  })
  id?: string;

  @Column({
    name: 'state_gate',
    default: () => 'false',
  })
  stateGate: boolean;

  @Column({
    name: 'emergency',
    default: () => 'false',
  })
  emergency: boolean;

  @Column('date', {
    name:"emergency_date",
    default: () => 'CURRENT_DATE',
  })
  emergencyDate?: Date | number;

  @OneToMany(() => OpenGateEntity, (openGate) => openGate.gatesOpen, {
    cascade: ['insert'],
  })
  openGates?: OpenGateEntity[];

  @OneToMany(() => CloseGateEntity, (closeGate) => closeGate.gatesClose, {
    cascade: ['insert'],
  })
  @JoinColumn()
  closeGates?: CloseGateEntity[];
}
