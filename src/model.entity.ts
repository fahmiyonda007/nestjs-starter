import { Field, ID } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Int } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export default abstract class Model extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

}
