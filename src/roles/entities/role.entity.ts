import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

import Model from '../../model.entity';

@ObjectType()
@Entity()
export class Role extends Model {
  @Field()
  @Index({ unique: true })
  @Column()
  name: string;

  @Field((type) => Int)
  @VersionColumn()
  readonly version: number;
}
