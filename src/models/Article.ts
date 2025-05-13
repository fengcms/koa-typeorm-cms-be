import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  title: string

  @Column('int')
  channel_id: number

  @Column('text')
  description: string

  @Column('text')
  tags: string

  @Column('text')
  content: string

  @Column('text')
  markdown: string

  @Column('varchar')
  img: string

  @Column('varchar')
  video: string

  @Column('varchar')
  author: string

  @Column('varchar')
  origin: string

  @Column('varchar')
  editor: string

  @Column('int')
  user_id: number

  @Column('int', { default: 0 })
  istop: number

  @Column('int', { default: 0 })
  hits: number

  @Column('varchar', { default: 'NORMAL' })
  type: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @CreateDateColumn()
  time: Date
}
