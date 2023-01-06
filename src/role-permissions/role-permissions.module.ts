import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthOptionsService } from 'src/auth/auth-options.service';
import { ConfigModule } from 'src/config/config.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { RolesModule } from 'src/roles/roles.module';

import { RolePermission } from './entities/role-permission.entity';
import { RolePermissionsController } from './role-permissions.controller';
import { RolePermissionsResolver } from './role-permissions.resolver';
import { RolePermissionsService } from './role-permissions.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([RolePermission]),
    RolesModule,
    PermissionsModule,
  ],
  providers: [RolePermissionsResolver, RolePermissionsService],
  controllers: [RolePermissionsController],
  exports: [RolePermissionsService],
})
export class RolePermissionsModule {}
