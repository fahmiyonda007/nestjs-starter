import { Field, ID } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class Base extends BaseEntity {
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
