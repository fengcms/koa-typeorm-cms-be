import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { nullable: true })
  defendant: string

  @Column('varchar', { nullable: true })
  problem: string

  @Column('varchar', { nullable: true })
  appeal: string

  @Column('varchar', { nullable: true })
  img: string

  @Column('text', { nullable: true })
  detail: string

  @Column('int')
  user_id: number

  @Column('varchar', { nullable: true })
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
