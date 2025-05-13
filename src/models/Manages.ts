import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Manages {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  account: string

  @Column('text')
  password: string

  @Column()
  name: string

  @Column()
  avatar: string

  @Column('text')
  mark: string

  @Column({ default: 'MARKDOWN' })
  editor: string

  @Column({ type: 'bigint' })
  mobile: number

  @Column()
  email: string

  @CreateDateColumn()
  time: Date
}
