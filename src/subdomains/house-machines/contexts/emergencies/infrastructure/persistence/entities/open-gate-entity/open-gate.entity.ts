import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { GateEntity } from '../gate-entity/gate-entity.entity';


/**
 *
 * Se crea la entidad OpenGateEntity que va ser usada en la base de datos con TypeOrm
 *
 * @export OpenGateEntity
 * @class OpenGateEntity
 */
@Index('open_gate_date_key', ['date'])
@Index('open_gate_primary_key', ['id'], { unique: true })
@Entity('open_gate', { schema: 'public' })
export class OpenGateEntity {
  @Column('uuid', {
    primary: true,
    name: 'open_gate_id',
    default: () => 'uuid_generate_v4()',
  })
  @ApiProperty()
  id?: string;

  @Column('date', {
    default: () => 'CURRENT_DATE',
  })
  @ApiProperty()
  date?: Date | number;

  @ManyToOne(() => GateEntity, (gate) => gate.openGates, {
    cascade: ['insert'],
  })
  @JoinColumn()
  gatesOpen: GateEntity;
}
