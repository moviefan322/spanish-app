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

-entities is the array of all entities in the project, but this should be imported from the entities folder, so we use \_\_dirname to get the current directory and then add the path to the entities folder.

-this connects the project to sqlite for now, but we will reconfigure it later to use postgresql.

3- (for creating entities)

write the entity class in the entities folder, for example:

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number;

@Column()
email: string;

@Column()
password: string;

@Column()
userName: string;

@Column({ default: false })
isAdmin: boolean;
}

4- (for creating repositories)

Connect the entity to the module by importing it in the module file, for example:

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
imports: [TypeOrmModule.forFeature([User])],
controllers: [UsersController],
providers: [UsersService],
})
export class UsersModule {}

then, import that into the entities array in app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { StatsModule } from './stats/stats.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
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

