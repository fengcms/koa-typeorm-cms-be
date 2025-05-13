import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Single {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  title: string

  @Column('text')
  description: string

  @Column('text')
  tags: string

  @Column('text')
  content: string

  @Column('text')
  markdown: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @Column('int', { default: 0 })
  hits: number

  @CreateDateColumn()
  time: Date
}
