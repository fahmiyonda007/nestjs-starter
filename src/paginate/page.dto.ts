// eslint-disable-next-line max-classes-per-file
import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}

export interface IPaginatedType<T> {
  data: T[];
  meta: PageMetaDto;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    data: T[];

    @Field()
    meta: PageMetaDto;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
