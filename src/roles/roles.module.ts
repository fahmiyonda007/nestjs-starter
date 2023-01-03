import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthOptionsService } from 'src/auth/auth-options.service';
import { ConfigModule } from 'src/config/config.module';

import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  imports: [
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [RolesResolver, RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
