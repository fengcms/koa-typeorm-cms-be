import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { default: '' })
  defendant: string

  @Column('varchar', { default: '' })
  problem: string

  @Column('varchar', { default: '' })
  appeal: string

  @Column('varchar', { default: '' })
  img: string

  @Column('text', { nullable: true })
  detail: string

  @Column('int')
  user_id: number

  @Column('varchar', { default: '' })
  user_name: string

  @Column('text', { nullable: true })
  reply: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @CreateDateColumn()
  reply_time: Date

  @CreateDateColumn()
  time: Date
}
