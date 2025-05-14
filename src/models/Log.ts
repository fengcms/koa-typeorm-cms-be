import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { nullable: true })
  type: string

  @Column('varchar', { nullable: true })
  role: string

  @Column('text', { nullable: true })
  mark: string

  @Column('int')
  user_id: number

  @Column('varchar', { nullable: true })
  user_name: string

  @CreateDateColumn()
  time: Date
}
