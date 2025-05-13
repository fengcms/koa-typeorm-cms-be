import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Reporter {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  avatar: string

  @Column()
  code: string

  @Column()
  position: string

  @Column('text')
  mark: string

  @Column({ default: 'MAN' })
  sex: string

  @Column({ type: 'bigint' })
  mobile: number

  @Column()
  email: string

  @Column({ default: 'PENDING' })
  status: string

  @CreateDateColumn()
  time: Date
}
