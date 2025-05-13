import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Origin {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  contact: string

  @Column()
  logo: string

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
