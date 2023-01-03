import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsAscii,
  IsEmail,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

import { User } from '../../users/users.entity';

@InputType()
export class SignUpInput implements Partial<User> {
  @ApiProperty()
  @Field()
  @IsAlphanumeric()
  @MinLength(1)
  readonly name: string;

  @ApiProperty()
  @Field()
  @IsEmail()
  @MinLength(1)
  readonly email: string;

  @ApiProperty()
  @Field()
  @IsPhoneNumber('ID')
  @MinLength(1)
  readonly phone: string;

  @ApiProperty()
  @Field()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}
