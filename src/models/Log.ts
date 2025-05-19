import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { default: '' })
  type: string

  @Column('varchar', { default: '' })
  role: string

  @Column('text', { nullable: true })
  mark: string

  @Column('int')
  user_id: number

  @Column('varchar', { default: '' })
  user_name: string

  @CreateDateColumn()
  time: Date
}
