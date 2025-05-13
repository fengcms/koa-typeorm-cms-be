import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  defendant: string

  @Column('varchar')
  problem: string

  @Column('varchar')
  appeal: string

  @Column('varchar')
  img: string

  @Column('text')
  detail: string

  @Column('int')
  user_id: number

  @Column('varchar')
  user_name: string

  @Column('text')
  reply: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @CreateDateColumn()
  reply_time: Date

  @CreateDateColumn()
  time: Date
}
