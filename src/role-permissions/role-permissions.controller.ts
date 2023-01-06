import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateRolePermissionInput } from './dto/create-role-permission.input';
import { RolePermission } from './entities/role-permission.entity';
import { RolePermissionsService } from './role-permissions.service';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Role-permissions')
@Controller('api/role-permissions')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}

  @Post()
  async create(
    @Body() createRolePermissionInput: CreateRolePermissionInput,
  ): Promise<RolePermission> {
    const data = await this.rolePermissionsService.create(
      createRolePermissionInput,
    );
    return data;
  }
}
