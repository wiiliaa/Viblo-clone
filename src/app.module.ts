import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/TypeOrm.config';

@Module({
  imports: [AuthModule, UserModule, TypeOrmModule.forRoot(config)],
})
export class AppModule {}
