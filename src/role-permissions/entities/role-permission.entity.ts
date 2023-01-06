import { ObjectType } from '@nestjs/graphql';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import Model from '../../model.entity';

@ObjectType()
@Entity('role_permissions')
export class RolePermission extends Model {
  @ManyToOne(() => Role, (x) => x.rolePermission, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  role: Role;

  @ManyToOne(() => Permission, (x) => x.rolePermission, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  permission: Permission;
}
