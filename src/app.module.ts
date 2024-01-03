import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [AuthModule, CommonModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
