import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionsService } from 'src/permissions/permissions.service';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';

import { CreateRolePermissionInput } from './dto/create-role-permission.input';
import { UpdateRolePermissionInput } from './dto/update-role-permission.input';
import { RolePermission } from './entities/role-permission.entity';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly myRepo: Repository<RolePermission>,
    private readonly roleRepo: RolesService,
    private readonly permissionRepo: PermissionsService,
  ) {}

  async create(
    createRolePermissionInput: CreateRolePermissionInput,
  ): Promise<RolePermission> {
    await this.roleRepo.findOne(createRolePermissionInput.role);
    await this.permissionRepo.findOne(createRolePermissionInput.permission);

    const u = new RolePermission();
    Object.assign(u, createRolePermissionInput);
    const result = await this.myRepo.save(u);
    return result;
  }

  // findAll() {
  //   return `This action returns all rolePermissions`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} rolePermission`;
  // }

  // update(id: number, updateRolePermissionInput: UpdateRolePermissionInput) {
  //   return `This action updates a #${id} rolePermission`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} rolePermission`;
  // }
}
