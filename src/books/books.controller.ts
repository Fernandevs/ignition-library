import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {
  }

  @Auth()
  @Post()
  @ApiResponse({ status: 201, description: 'Boox was created', type: Book  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(@Body() createBookDto: CreateBookDto, @GetUser() user: User): Promise<{ id: number }> {
    return this.booksService.create(createBookDto, user);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Books were obtained', type: [Book] })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Auth()
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Book was deleted', type: Book })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.booksService.remove(+id);
  }
}
