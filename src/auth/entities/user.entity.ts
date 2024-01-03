import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: '1',
    description: 'User ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ApiProperty({
    example: 'email@example.com',
    description: 'User email',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'Abcd1234*',
    description: 'User password',
    uniqueItems: true
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    uniqueItems: true
  })
  @Column('text')
  name: string;

  @OneToMany(
    () => Book,
    (product) => product.user,
  )
  book: Book;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
