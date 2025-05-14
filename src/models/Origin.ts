import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Origin {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar')
  name: string

  @Column('varchar', { nullable: true })
  contact: string

  @Column('varchar', { nullable: true })
  logo: string

  @Column('text', { nullable: true })
  mark: string

  @Column({ type: 'bigint', nullable: true })
  mobile: number

  @Column('varchar', { nullable: true })
  email: string

  @Column('varchar', { nullable: true })
  website: string

  @CreateDateColumn()
  time: Date
}
