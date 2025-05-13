import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Manages {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  account: string

  @Column('text')
  password: string

  @Column('varchar')
  name: string

  @Column('varchar')
  avatar: string

  @Column('text')
  mark: string

  @Column('varchar', { default: 'MARKDOWN' })
  editor: string

  @Column({ type: 'bigint' })
  mobile: number

  @Column('varchar')
  email: string

  @CreateDateColumn()
  time: Date
}
