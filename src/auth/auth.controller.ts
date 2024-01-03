import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'User was created', type: User  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiResponse({ status: 201, description: 'Token created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
