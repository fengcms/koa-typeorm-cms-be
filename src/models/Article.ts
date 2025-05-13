import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  channel_id: number

  @Column('text')
  description: string

  @Column('text')
  tags: string

  @Column('text')
  content: string

  @Column('text')
  markdown: string

  @Column()
  img: string

  @Column()
  video: string

  @Column()
  author: string

  @Column()
  origin: string

  @Column()
  editor: string

  @Column()
  user_id: number

  @Column({ default: 0 })
  istop: number

  @Column({ default: 0 })
  hits: number

  @Column({ default: 'NORMAL' })
  type: string

  @Column({ default: 'PENDING' })
  status: string

  @CreateDateColumn()
  time: Date
}
