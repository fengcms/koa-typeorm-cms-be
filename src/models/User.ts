import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  account: string

  @Column('varchar')
  password: string

  @Column('varchar')
  avatar: string

  @Column('text')
  mark: string

  @Column('text')
  signature: string

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'UNKNOWN'] })
  sex: string

  @Column('varchar', { default: 'MARKDOWN' })
  editor: string

  @Column({ type: 'bigint' })
  mobile: number

  @Column('varchar')
  email: string

  @Column('varchar')
  website: string

  @Column('varchar', { default: 'ACTIVE' })
  status: string

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean

  @CreateDateColumn()
  time: Date
}
