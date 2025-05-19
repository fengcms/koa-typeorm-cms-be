import { makeSalt } from '@/utils/tools'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  account: string

  @Column('varchar')
  name: string

  @Column('varchar')
  password: string

  @Column('varchar', { default: '' })
  avatar: string

  @Column('text', { nullable: true })
  mark: string

  @Column('text', { nullable: true })
  signature: string

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'UNKNOWN'], default: 'UNKNOWN' })
  sex: string

  @Column('varchar', { default: 'MARKDOWN' })
  editor: string

  @Column('varchar', { default: '' })
  mobile: string

  @Column('varchar', { default: '' })
  email: string

  @Column('varchar', { default: '' })
  website: string

  @Column('varchar', { default: 'ACTIVE' })
  status: string

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean

  @Column('varchar', { default: makeSalt() })
  salt: string

  @CreateDateColumn()
  time: Date
}
