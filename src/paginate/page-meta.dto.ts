import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDtoParameters } from './interfaces';

@ObjectType()
export class PageMetaDto {
  @ApiProperty()
  @Field()
  readonly page: number;

  @ApiProperty()
  @Field()
  readonly take: number;

  @ApiProperty()
  @Field()
  readonly itemCount: number;

  @ApiProperty()
  @Field()
  readonly pageCount: number;

  @ApiProperty()
  @Field()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  @Field()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
