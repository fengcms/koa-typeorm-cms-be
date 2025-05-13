import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('text')
  mark: string

  @Column()
  img: string

  @Column()
  link: string

  @CreateDateColumn()
  time: Date
}
