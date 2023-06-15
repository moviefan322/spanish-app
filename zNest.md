1- 

CLI:
-nest g module xxx
-nest g controller xxx
-nest g service xxx


2- (for connecting TypeOrm & Sqlite)

in app.module.ts:

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    LessonsModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

notes: 
-synchronize: true is only for development, not for production

-entities is the array of all entities in the project, but this should be imported from the entities folder, so we use __dirname to get the current directory and then add the path to the entities folder.

-this connects the project to sqlite for now, but we will reconfigure it later to use postgresql.