import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {
  }

  async create(createBookDto: CreateBookDto, user: User): Promise<{ id: number }> {
    try {
      const book: Book = this.bookRepository.create({
        ...createBookDto,
        userId: user.id,
        user,
      });

      await this.bookRepository.save(book);

      const { id } = book;

      return { id };
    } catch (error) {
      this.handleDatabaseExceptions(error);
    }
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const book: Book = await this.bookRepository.findOne({ where: { id } });

    if(!book) throw new NotFoundException(`Book with id: ${ id } not found`);

    await this.bookRepository.remove(book);

    return { success: true };
  }

  private handleDatabaseExceptions(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
