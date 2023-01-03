import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>,
  ) {}

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const u = new Role();
    Object.assign(u, createRoleInput);
    const result = await this.rolesRepo.save(u);
    return result;
  }

  async findAll(): Promise<Role[]> {
    const datas = await this.rolesRepo.find();
    return datas;
  }

  async findOne(id: number): Promise<Role> {
    const data = await this.rolesRepo.findOne({ id });

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }

  async update(id: number, updateRoleInput: UpdateRoleInput): Promise<Role> {
    const data = await this.rolesRepo.findOne({ id });

    if (!data) {
      throw new NotFoundException();
    }

    Object.assign(data, updateRoleInput);
    const result = await this.rolesRepo.save(data);

    return result;
  }

  async remove(id: number): Promise<Role> {
    const data = await this.rolesRepo.findOne({ id });
    if (!data) {
      throw new NotFoundException();
    }

    await this.rolesRepo.remove(data);
    return data;
  }
}
