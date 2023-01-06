import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

import { Permission } from '../entities/permission.entity';

export class UpdatePermissionDto implements Partial<Permission> {
  @ApiProperty()
  @Field()
  @IsString()
  @MinLength(1)
  readonly name: string;
}
