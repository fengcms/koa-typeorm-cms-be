import { makeSalt } from '@/utils/tools'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Editor {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  account: string

  @Column('text')
  password: string

  @Column('varchar')
  name: string

  @Column('varchar', { default: '' })
  avatar: string

  @Column('text', { nullable: true })
  mark: string

  @Column('varchar', { default: 'MARKDOWN' })
  editor: string

  @Column({ type: 'bigint', nullable: true })
  mobile: number

  @Column('varchar', { default: '' })
  email: string

  @Column('varchar', { default: '' })
  website: string

  @Column('varchar', { default: makeSalt() })
  salt: string

  @CreateDateColumn()
  time: Date
}
