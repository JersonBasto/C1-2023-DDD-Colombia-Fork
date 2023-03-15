import { Column, Entity, Index } from 'typeorm';

@Index('close_gate_date_key', ['date'])
@Index('close_gate_primary_key', ['id'], { unique: true })
@Entity('close_gate', { schema: 'public' })
export class CloseGateEntity {
  @Column('uuid', {
    primary: true,
    name: 'close_gate_id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;
  @Column('date', {
    default: () => 'CURRENT_DATE',
  })
  date: Date | number;
}