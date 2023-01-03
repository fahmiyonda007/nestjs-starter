import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
} from '@nestjs/common';
import {
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleinput: CreateRoleInput): Promise<Role> {
    const data = await this.rolesService.create(createRoleinput);
    return data;
  }

  @Get()
  async findAll(): Promise<Role[]> {
    const datas = await this.rolesService.findAll();
    return datas;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleinput: UpdateRoleInput,
  ): Promise<Role> {
    return this.rolesService.update(+id, updateRoleinput);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Role> {
    return this.rolesService.remove(+id);
  }
}
