import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Reporter {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar')
  avatar: string

  @Column('varchar')
  code: string

  @Column('varchar')
  position: string

  @Column('text')
  mark: string

  @Column('varchar', { default: 'MAN' })
  sex: string

  @Column({ type: 'bigint' })
  mobile: number

  @Column('varchar')
  email: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @CreateDateColumn()
  time: Date
}
