import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  type: string

  @Column('varchar')
  role: string

  @Column('text')
  mark: string

  @Column('int')
  user_id: number

  @Column('varchar')
  user_name: string

  @CreateDateColumn()
  time: Date
}
