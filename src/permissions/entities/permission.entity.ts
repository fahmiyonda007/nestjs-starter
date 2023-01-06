import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, VersionColumn } from 'typeorm';

import Model from '../../model.entity';

@ObjectType()
@Entity()
export class Permission extends Model {
  @Field()
  @Index({ unique: true })
  @Column()
  name: string;

  @Field((type) => Int)
  @VersionColumn()
  readonly version: number;
}
