import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  avatar: string

  @Column('text')
  mark: string

  @Column({ type: 'bigint' })
  mobile: number

  @Column()
  email: string

  @Column()
  website: string

  @CreateDateColumn()
  time: Date
}
