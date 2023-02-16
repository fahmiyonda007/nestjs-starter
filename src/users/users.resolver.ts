/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-unresolved */
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PageOptionsDto } from 'src/paginate/dtos';
import { PageDto } from 'src/paginate/page.dto';

import { GqlAuthGuard } from '../auth/gql-auth.guard';

import { PaginatedUser, User } from './users.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedUser, { name: 'users' })
  async users(
    @Args('pageOptionsDto') pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    const users = await this.usersService.findAll(pageOptionsDto);
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async user(@Args('input') id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);
    return user;
  }
}
