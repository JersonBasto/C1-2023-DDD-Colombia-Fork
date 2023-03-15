import { Column, Entity, Index } from 'typeorm';

@Index('open_gate_date_key', ['date'])
@Index('open_gate_primary_key', ['id'], { unique: true })
@Entity('open_gate', { schema: 'public' })
export class OpenGateEntity {
  @Column('uuid', {
    primary: true,
    name: 'open_gate_id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;
  @Column('date', {
    default: () => 'CURRENT_DATE',
  })
  date: Date | number;
}
