import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

import Model from '../../model.entity';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';

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

  @OneToMany(() => RolePermission, (x) => x.role)
  rolePermission: RolePermission[];
}
