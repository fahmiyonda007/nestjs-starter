import { Field, InputType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { Order } from './constants';

@InputType()
export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @Field(() => Order, {
    description: 'Order By',
    defaultValue: Order.ASC,
    nullable: true,
  })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Field({ description: 'Page', defaultValue: 1, nullable: true })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 500,
    default: 10,
  })
  @Field({ description: 'Take', nullable: true })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  @IsOptional()
  readonly take?: number = 10;

  @ApiPropertyOptional({
    default: '',
  })
  @Field({ description: 'Filter', nullable: true })
  @Type(() => String)
  @IsOptional()
  readonly filter?: string = '';

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
