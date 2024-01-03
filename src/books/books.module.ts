import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './entities/book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [AuthModule, TypeOrmModule.forFeature([Book])],
  exports: [TypeOrmModule],
})
export class BooksModule {}
