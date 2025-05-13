import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  tag: string

  @Column('int')
  channel_id: number

  @Column('int', { default: 0 })
  hits: number

  @CreateDateColumn()
  time: Date
}
