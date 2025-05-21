import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar', { default: '' })
  avatar: string

  @Column('text', { nullable: true })
  mark: string

  @Column('varchar', { default: '' })
  mobile: string

  @Column('varchar', { default: '' })
  email: string

  @Column('varchar', { default: '' })
  website: string

  @CreateDateColumn()
  time: Date
}
