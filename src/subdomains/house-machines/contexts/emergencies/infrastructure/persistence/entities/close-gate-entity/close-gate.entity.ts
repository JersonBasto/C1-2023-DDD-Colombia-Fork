import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { GateEntity } from '../gate-entity/gate-entity.entity';

@Index('close_gate_date_key', ['date'])
@Index('close_gate_primary_key', ['id'], { unique: true })
@Entity('close_gate', { schema: 'public' })
export class CloseGateEntity {
  @Column('uuid', {
    primary: true,
    name: 'close_gate_id',
    default: () => 'uuid_generate_v4()',
  })
  @ApiProperty()
  id?: string;
  
  @Column('date', {
    default: () => 'CURRENT_DATE',
  })
  @ApiProperty()
  date?: Date | number;

  @ManyToOne(() => GateEntity, (gate) => gate.closeGates, {
    cascade: ['insert'],
  })
  @JoinColumn()
  gatesClose: GateEntity;
}
