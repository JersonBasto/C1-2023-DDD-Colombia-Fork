import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { CloseGateDomainEntity } from '../../../../domain';
import { GateEntity } from '../gate-entity/gate-entity.entity';

/**
 *
 * Se crea la entidad CloseGateEntity que va ser usada en la base de datos con TypeOrm
 *
 * @export CloseGateEntity
 * @class CloseGateEntity
 */
@Index('close_gate_date_key', ['date'])
@Index('close_gate_primary_key', ['id'], { unique: true })
@Entity('close_gate', { schema: 'public' })
export class CloseGateEntity extends CloseGateDomainEntity {
  @Column('uuid', {
    primary: true,
    name: 'close_gate_id',
    default: () => 'uuid_generate_v4()',
  })
  @ApiProperty()
  id?: string;

  @Column("text")
  @ApiProperty()
  description:string

  @Column({
    type: 'timestamptz',
    name: 'emergency_date',
    default: () => 'NOW()',
  })
  @ApiProperty()
  date?: Date | number;

  @ManyToOne(() => GateEntity, (gate) => gate.closeGates, {
    cascade: ['insert'],
  })
  @JoinColumn()
  gatesClose: GateEntity;
}
