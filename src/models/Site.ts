import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar')
  title: string

  @Column('varchar', { default: '' })
  logo: string

  @Column('text', { nullable: true })
  keywords: string

  @Column('text', { nullable: true })
  description: string

  @Column('text', { nullable: true })
  copyright: string

  @Column('text', { nullable: true })
  mobile_copyright: string

  @CreateDateColumn()
  time: Date
}
