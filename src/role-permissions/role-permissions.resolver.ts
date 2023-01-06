import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateRolePermissionInput } from './dto/create-role-permission.input';
import { UpdateRolePermissionInput } from './dto/update-role-permission.input';
import { RolePermission } from './entities/role-permission.entity';
import { RolePermissionsService } from './role-permissions.service';

@Resolver(() => RolePermission)
export class RolePermissionsResolver {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}
}
