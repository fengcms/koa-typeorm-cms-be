import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  role: string

  @Column('text')
  mark: string

  @Column()
  user_id: number

  @Column()
  user_name: string

  @CreateDateColumn()
  time: Date
}
