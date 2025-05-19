import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Reporter {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar', { default: '' })
  avatar: string

  @Column('varchar', { default: '' })
  code: string

  @Column('varchar', { default: '' })
  position: string

  @Column('text', { nullable: true })
  mark: string

  @Column('varchar', { default: 'MAN' })
  sex: string

  @Column('varchar', { default: '' })
  mobile: ''

  @Column('varchar', { default: '' })
  email: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @CreateDateColumn()
  time: Date
}
