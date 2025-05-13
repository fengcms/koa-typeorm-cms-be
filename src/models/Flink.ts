import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Flink {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text')
  mark: string

  @Column({ default: 0 })
  sort: number

  @Column()
  link: string

  @CreateDateColumn()
  time: Date
}
