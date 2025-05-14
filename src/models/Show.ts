import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('text', { nullable: true })
  mark: string

  @Column('varchar', { nullable: true })
  img: string

  @Column('varchar', { nullable: true })
  link: string

  @CreateDateColumn()
  time: Date
}
