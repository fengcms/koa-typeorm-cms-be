import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Origin {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar', { default: '' })
  contact: string

  @Column('varchar', { default: '' })
  logo: string

  @Column('text', { nullable: true })
  mark: string

  @Column({ type: 'varchar', nullable: true })
  mobile: string

  @Column('varchar', { default: '' })
  email: string

  @Column('varchar', { default: '' })
  website: string

  @CreateDateColumn()
  time: Date
}
