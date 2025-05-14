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

  @Column('varchar', { nullable: true })
  keywords: string

  @Column('text', { nullable: true })
  description: string

  @Column('varchar', { default: 'PENDING' })
  status: string

  @Column('varchar', { nullable: true })
  show_img: string

  @Column('varchar', { nullable: true })
  website: string

  @CreateDateColumn()
  time: Date
}
