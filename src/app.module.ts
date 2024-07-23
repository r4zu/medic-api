import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserInfoModule } from './user-info/user-info.module';
import { envs } from './config';
import { MedicInfoModule } from './medic-info/medic-info.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      database: envs.dbName,
      username: envs.dbUsername,
      password: envs.dbPassword,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserInfoModule,
    MedicInfoModule,
  ],
})
export class AppModule {}
