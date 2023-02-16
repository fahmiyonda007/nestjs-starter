import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PageOptionsDto } from '../paginate/dtos';
import { PageMetaDto } from '../paginate/page-meta.dto';
import { PageDto } from '../paginate/page.dto';

import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly myRepo: Repository<User>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    const queryBuilder = this.myRepo.createQueryBuilder('user');

    queryBuilder
      .where('user.email like :email', { email: `%${pageOptionsDto.filter}%` })
      .orWhere('user.username like :username', {
        username: `%${pageOptionsDto.filter}%`,
      })
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.myRepo.findOne(id);
    return user;
  }

  async findOneByUserName(username: string): Promise<User> {
    const user = await this.myRepo.findOne({ username });
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.myRepo.findOne({ email });
    return user;
  }
}
