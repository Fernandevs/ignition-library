import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../auth/entities/user.entity';

@Entity('books')
export class Book {
  @ApiProperty({
    example: '1',
    description: 'Book ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ApiProperty({
    example: 'Miguel de Cervantes Saavedra',
    description: 'Book author',
    uniqueItems: true
  })
  @Column('text')
  author: string;

  @ApiProperty({
    example: '9788408061052',
    description: 'Book ISBN',
    uniqueItems: true
  })
  @Column('text', {
    unique: true,
  })
  isbn: string;

  @ApiProperty({
    example: '1605-01-16',
    description: 'Book release date',
    uniqueItems: true
  })
  @Column('date')
  releaseDate: Date;

  @ApiProperty({
    example: 'El ingenioso hidalgo don Quijote de la Mancha',
    description: 'Book release date',
    uniqueItems: true
  })
  @Column('text')
  title: string;

  @ApiProperty({
    example: 'El ingenioso hidalgo don Quijote de la Mancha',
    description: 'User id who inserted the book',
    uniqueItems: true
  })
  @Column('int')
  userId: number;

  @ManyToOne(
    () => User,
    (user: User) => user.book,
    { eager: true },
  )
  user: User;
}
