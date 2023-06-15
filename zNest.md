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

notes: repeat these steps for all modules/entities

5- setting up validation

Now that we are ready to write routes and dtos, we need to plug in validation to the project. In the main.ts file, add the following:

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

6- (for creating dtos)

Dtos define what a request body should look like. For example, if we have a user entity with email, password, and userName, we can create a dto for creating a user with only email and password, and another dto for updating a user with only userName.

We can also use validation in dtos to make sure that the request body is valid.

To create a dto, we create a class in the dtos folder, for example:

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}

7- (for creating routes)

To create routes in a controller, we use the Nest.js decorators. For example, to create a route for creating a user, we can do the following:

import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}

note: Here, we use the body decorator to get the request body, and we pass in the CreateUserDto to validate the request body.