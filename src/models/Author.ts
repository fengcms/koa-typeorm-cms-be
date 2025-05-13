import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar')
  avatar: string

  @Column('text')
  mark: string

  @Column({ type: 'bigint' })
  mobile: number

  @Column('varchar')
  email: string

  @Column('varchar')
  website: string

  @CreateDateColumn()
  time: Date
}
