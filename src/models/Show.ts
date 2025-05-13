import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('text')
  mark: string

  @Column('varchar')
  img: string

  @Column('varchar')
  link: string

  @CreateDateColumn()
  time: Date
}
