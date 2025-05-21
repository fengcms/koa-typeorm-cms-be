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

  @Column('varchar', { default: '' })
  keywords: string

  @Column('text', { nullable: true })
  description: string

  @Column('varchar', { default: 'NORMAL' })
  status: string

  @Column('varchar', { default: '' })
  show_img: string

  @Column('varchar', { default: '' })
  website: string

  @CreateDateColumn()
  time: Date
}
