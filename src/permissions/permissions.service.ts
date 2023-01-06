import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepo: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const u = new Permission();
    Object.assign(u, createPermissionDto);
    const result = await this.permissionsRepo.save(u);
    return result;
  }

  async findAll(): Promise<Permission[]> {
    const datas = await this.permissionsRepo.find();
    return datas;
  }

  async findOne(id: number): Promise<Permission> {
    const data = await this.permissionsRepo.findOne({ id });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const data = await this.permissionsRepo.findOne({ id });

    if (!data) {
      throw new NotFoundException();
    }

    Object.assign(data, updatePermissionDto);
    const result = await this.permissionsRepo.save(data);

    return result;
  }

  async remove(id: number): Promise<Permission> {
    const data = await this.permissionsRepo.findOne({ id });
    if (!data) {
      throw new NotFoundException();
    }

    await this.permissionsRepo.remove(data);
    return data;
  }
}
