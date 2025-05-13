import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  title: string

  @Column()
  logo: string

  @Column('text')
  keywords: string

  @Column('text')
  description: string

  @Column('text')
  copyright: string

  @CreateDateColumn()
  time: Date
}
