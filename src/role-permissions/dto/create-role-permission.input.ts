import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateRolePermissionInput {
  @ApiProperty()
  @Field()
  @IsNumber()
  role: number;

  @ApiProperty()
  @Field()
  @IsNumber()
  permission: number;
}
