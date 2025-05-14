import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Flink {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('text', { nullable: true })
  mark: string

  @Column('int', { default: 0 })
  sort: number

  @Column('varchar', { nullable: true })
  link: string

  @CreateDateColumn()
  time: Date
}
