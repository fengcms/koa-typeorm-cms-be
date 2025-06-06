import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  title: string

  @Column('int', { default: 0 })
  channel_id: number

  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  tags: string

  @Column('text', { nullable: true })
  content: string

  @Column('text', { nullable: true })
  markdown: string

  @Column('varchar', { default: '' })
  img: string

  @Column('varchar', { default: '' })
  video: string

  @Column('varchar', { default: '' })
  author: string

  @Column('varchar', { default: '' })
  origin: string

  @Column('varchar', { default: '' })
  editor: string

  @Column('int', { nullable: true })
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
