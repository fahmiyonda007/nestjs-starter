/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import BaseGuid from 'src/base/base-guid.entity';
import { Paginated } from 'src/paginate/page.dto';
import { Column, Entity, VersionColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class User extends BaseGuid {
  @Field({ description: 'Full name Of user', nullable: false })
  @Column()
  fullname: string;

  @Field({ description: 'Unique Username Of user', nullable: false })
  @Column({ unique: true })
  username: string;

  @Field({ description: 'Unique Email Of user', nullable: false })
  @Column({ unique: true })
  email: string;

  @Field({ description: 'Password Of user', nullable: false })
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Field({ description: 'Phone Of user', nullable: false })
  @Column()
  phone: string;

  @Field({ description: 'Address Of user', nullable: true })
  @Column()
  address: string;

  @Field((type) => Int)
  @VersionColumn()
  readonly version: number;
}

@ObjectType()
export class PaginatedUser extends Paginated(User) {}
