import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  account: string

  @Column()
  password: string

  @Column()
  avatar: string

  @Column('text')
  mark: string

  @Column('text')
  signature: string

  @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'UNKNOWN'] })
  sex: string

  @Column({ default: 'MARKDOWN' })
  editor: string

  @Column({ type: 'bigint' })
  mobile: number

  @Column()
  email: string

  @Column()
  website: string

  @Column({ default: 'ACTIVE' })
  status: string

  @Column({ default: false })
  isAdmin: boolean

  @CreateDateColumn()
  time: Date
}
