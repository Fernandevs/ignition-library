import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book author',
    nullable: false
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  author: string;

  @ApiProperty({
    description: 'Book ISBN (unique)',
    nullable: false
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(13)
  @MaxLength(13)
  isbn: string;

  @ApiProperty({
    description: 'Book release date',
    nullable: false
  })
  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({
    description: 'Book title',
    nullable: false
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Book user id',
    nullable: false
  })
  @IsInt()
  @IsOptional()
  @IsPositive()
  @Min(1)
  userId?: number;
}
