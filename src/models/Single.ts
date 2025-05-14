import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Single {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  title: string

  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  tags: string

  @Column('text', { nullable: true })
  content: string

  @Column('text', { nullable: true })
  markdown: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @Column('int', { default: 0 })
  hits: number

  @CreateDateColumn()
  time: Date
}
