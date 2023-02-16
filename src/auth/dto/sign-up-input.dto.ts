import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

@InputType()
export class SignUpInput {
  @ApiProperty()
  @Field({ description: 'Full name Of user', nullable: false })
  @MinLength(1)
  readonly fullname: string;

  @ApiProperty()
  @Field({ description: 'Unique Username Of user', nullable: false })
  @IsAlphanumeric()
  @MinLength(1)
  readonly username: string;

  @ApiProperty()
  @Field({ description: 'Unique Email Of user', nullable: false })
  @MinLength(1)
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @Field({ description: 'Password Of user', nullable: false })
  @IsAlphanumeric()
  @MinLength(8)
  readonly password: string;

  @ApiProperty()
  @Field({ description: 'Phone Of user', nullable: false })
  @MinLength(1)
  @IsPhoneNumber('ID')
  readonly phone: string;

  @ApiProperty()
  @Field({ description: 'Address Of user', nullable: true })
  @IsAlphanumeric()
  @MinLength(1)
  readonly address: string;
}
