import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthOptionsService } from 'src/auth/auth-options.service';
import { ConfigModule } from 'src/config/config.module';

import { Permission } from './entities/permission.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsResolver } from './permissions.resolver';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([Permission]),
  ],
  exports: [PermissionsService],
  providers: [PermissionsService, PermissionsResolver],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
