import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { User } from '../users/users.entity';

import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in-input.dto';
import { SignInResult } from './dto/sign-in-result.dto';
import { SignUpInput } from './dto/sign-up-input.dto';

@Resolver((of) => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => User)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    const result = await this.authService.signUp(signUpInput);
    return result;
  }

  @Mutation((returns) => SignInResult)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<Partial<SignInResult>> {
    const result = await this.authService.signIn(signInInput);
    if (!result.token) {
      throw new BadRequestException();
    }
    return result;
  }
}
