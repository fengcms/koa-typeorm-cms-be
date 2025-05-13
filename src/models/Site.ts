import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar')
  title: string

  @Column('varchar')
  logo: string

  @Column('text')
  keywords: string

  @Column('text')
  description: string

  @Column('text')
  copyright: string

  @Column('text')
  mobile_copyright: string

  @CreateDateColumn()
  time: Date
}
