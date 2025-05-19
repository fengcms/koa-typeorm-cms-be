import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('text', { nullable: true })
  mark: string

  @Column('varchar', { default: '' })
  img: string

  @Column('varchar', { default: '' })
  link: string

  @CreateDateColumn()
  time: Date
}
