import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  defendant: string

  @Column()
  problem: string

  @Column()
  appeal: string

  @Column()
  img: string

  @Column('text')
  detail: string

  @Column()
  user_id: number

  @Column()
  user_name: string

  @Column('text')
  reply: string

  @Column({ default: 'PENDING' })
  status: string

  @CreateDateColumn()
  reply_time: Date

  @CreateDateColumn()
  time: Date
}
