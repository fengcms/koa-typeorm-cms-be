import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  pid: number

  @Column('varchar')
  name: string

  @Column('int', { default: 0 })
  sort: number

  @Column('varchar')
  keywords: string

  @Column('text')
  description: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @Column('varchar')
  show_img: string

  @Column('varchar')
  website: string

  @CreateDateColumn()
  time: Date
}
