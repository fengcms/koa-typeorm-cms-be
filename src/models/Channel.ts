import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pid: number

  @Column()
  name: string

  @Column({ default: 0 })
  sort: number

  @Column()
  keywords: string

  @Column('text')
  description: string

  @Column({ default: 'PENDING' })
  status: string

  @Column()
  show_img: string

  @Column()
  website: string

  @CreateDateColumn()
  time: Date
}
