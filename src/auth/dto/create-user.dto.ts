import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email (unique)',
    nullable: false
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (unique). The password must have a Uppercase, lowercase letter and a number and a min 8 characters length',
    nullable: false
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    description: 'User name (unique)',
    nullable: false
  })
  @IsString()
  @MinLength(1)
  name: string;
}
