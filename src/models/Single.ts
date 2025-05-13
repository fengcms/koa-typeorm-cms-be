import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Single {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column('text')
  description: string

  @Column('text')
  tags: string

  @Column('text')
  content: string

  @Column('text')
  markdown: string

  @Column({ default: 'PENDING' })
  status: string

  @Column({ default: 0 })
  hits: number

  @CreateDateColumn()
  time: Date
}
