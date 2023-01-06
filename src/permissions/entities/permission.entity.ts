import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Index, OneToMany, VersionColumn } from 'typeorm';

import Model from '../../model.entity';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';

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

  @OneToMany(() => RolePermission, (x) => x.permission)
  rolePermission: RolePermission[];
}
