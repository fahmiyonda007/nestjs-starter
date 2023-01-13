import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '../users/users.entity';

import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in-input.dto';
import { SignInResult } from './dto/sign-in-result.dto';
import { SignUpInput } from './dto/sign-up-input.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async signUp(@Body() input: SignUpInput): Promise<User> {
    const user = await this.authService.signUp(input);
    return user;
  }

  @Post('login')
  async signIn(@Body() input: SignInInput): Promise<SignInResult> {
    const result = await this.authService.signIn(input);
    if (!result.token) {
      throw new BadRequestException();
    }
    return result;
  }
}
