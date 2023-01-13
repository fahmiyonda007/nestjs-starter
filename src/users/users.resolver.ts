import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PageOptionsDto } from 'src/paginate/dtos';
import { PageDto } from 'src/paginate/page.dto';

import { GqlAuthGuard } from '../auth/gql-auth.guard';

import { User } from './users.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [User])
  async users(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const users = await this.usersService.findAll(pageOptionsDto);
    return users;
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  async user(@Args('name') username: string): Promise<User> {
    const user = await this.usersService.findOneByUserName(username);
    return user;
  }
}
