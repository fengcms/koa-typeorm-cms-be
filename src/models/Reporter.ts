import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Reporter {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar', { nullable: true })
  avatar: string

  @Column('varchar', { nullable: true })
  code: string

  @Column('varchar', { nullable: true })
  position: string

  @Column('text', { nullable: true })
  mark: string

  @Column('varchar', { default: 'MAN' })
  sex: string

  @Column({ type: 'bigint', nullable: true })
  mobile: number

  @Column('varchar', { nullable: true })
  email: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @CreateDateColumn()
  time: Date
}
