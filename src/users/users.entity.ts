import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsPhoneNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  IsNull,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  @Exclude()
  readonly id: number;

  @Field()
  @Index({ unique: true })
  @Column()
  username: string;

  @Field()
  @Index({ unique: true })
  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Field()
  @Index({ unique: true })
  @IsPhoneNumber('ID')
  @Column({ nullable: true })
  phone: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field((type) => Int)
  @VersionColumn()
  readonly version: number;
}
