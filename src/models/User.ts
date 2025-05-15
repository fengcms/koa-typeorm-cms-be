import { makeSalt } from '@/utils/tools'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  account: string

  @Column('varchar')
  password: string

  @Column('varchar', { nullable: true })
  avatar: string

  @Column('text', { nullable: true })
  mark: string

  @Column('text', { nullable: true })
  signature: string

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'UNKNOWN'], default: 'UNKNOWN' })
  sex: string

  @Column('varchar', { default: 'MARKDOWN' })
  editor: string

  @Column({ type: 'bigint' })
  mobile: number

  @Column('varchar', { nullable: true })
  email: string

  @Column('varchar', { nullable: true })
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
