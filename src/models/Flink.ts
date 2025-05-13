import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Flink {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('text')
  mark: string

  @Column('int', { default: 0 })
  sort: number

  @Column('varchar')
  link: string

  @CreateDateColumn()
  time: Date
}
