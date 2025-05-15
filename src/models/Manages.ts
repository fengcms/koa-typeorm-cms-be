import { makeSalt } from '@/utils/tools'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Manages {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  account: string

  @Column('text')
  password: string

  @Column('varchar', { nullable: true })
  name: string

  @Column('varchar', { nullable: true })
  avatar: string

  @Column('text', { nullable: true })
  mark: string

  @Column('varchar', { default: 'MARKDOWN' })
  editor: string

  @Column({ type: 'bigint', nullable: true })
  mobile: number

  @Column('varchar', { nullable: true })
  email: string

  @Column('varchar', { default: makeSalt() })
  salt: string

  @CreateDateColumn()
  time: Date
}
