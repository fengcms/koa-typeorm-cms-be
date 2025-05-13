import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  tag: string

  @Column()
  channel_id: number

  @Column({ default: 0 })
  hits: number

  @CreateDateColumn()
  time: Date
}
