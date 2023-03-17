import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, OneToMany } from 'typeorm';
import { CloseGateEntity } from '../close-gate-entity/close-gate.entity';
import { OpenGateEntity } from '../open-gate-entity/open-gate.entity';


/**
 *
 * Se crea la entidad GateEntity que va ser usada en la base de datos con TypeOrm
 *
 * @export GateEntity
 * @class GateEntity
 */
@Index('gate_primary_key', ['id'], { unique: true })
@Entity('gate', { schema: 'public' })
export class GateEntity {
  @Column('uuid', {
    primary: true,
    name: 'gate_id',
    default: () => 'uuid_generate_v4()',
  })
  @ApiProperty()
  id?: string;

  @Column({
    name: 'state_gate',
    default: () => 'false',
  })
  @ApiProperty()
  stateGate: boolean;

  @Column({
    name: 'emergency',
    default: () => 'false',
  })
  @ApiProperty()
  emergency: boolean;

  @Column({
    type: 'timestamptz',
    name: 'emergency_date',
    default: () => 'NOW()',
  })
  @ApiProperty()
  emergencyDate?: Date | number | string;

  @OneToMany(() => OpenGateEntity, (openGate) => openGate.gatesOpen, {
    cascade: ['insert'],
  })
  @ApiProperty()
  openGates?: OpenGateEntity[];

  @OneToMany(() => CloseGateEntity, (closeGate) => closeGate.gatesClose, {
    cascade: ['insert'],
  })
  @JoinColumn()
  @ApiProperty()
  closeGates?: CloseGateEntity[];
}
