import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

import { Permission } from '../entities/permission.entity';

@InputType()
export class CreatePermissionDto extends Permission {
  @ApiProperty()
  @Field()
  @IsString()
  @MinLength(1)
  readonly name: string;
}
