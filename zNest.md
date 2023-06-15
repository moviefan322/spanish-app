1-

CLI:
-nest g module xxx
-nest g controller xxx
-nest g service xxx

2- (for connecting TypeOrm & Sqlite)

First, we need to install the following packages:

app.module.ts
----
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

user.entity.ts
----
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
username: string;

@Column({ default: false })
isAdmin: boolean;
}

4- (for creating repositories)

Connect the entity to the module by importing it in the module file, for example:

users.module.ts
----
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

app.module.ts
----
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

main.ts
----
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

Dtos define what a request body should look like. For example, if we have a user entity with email, password, and username, we can create a dto for creating a user with only email and password, and another dto for updating a user with only username.

We can also use validation in dtos to make sure that the request body is valid.

To create a dto, we create a class in the dtos folder, for example:

create-user.dto.ts
-----
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



users.controller.ts
----
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

8- (for creating services)

To create a service, we create a class in the services folder, in this example I have defined a method for creating a user:

users.service.ts
----
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string, username: string) {
    const user = this.repo.create({ email, password, username });

    return this.repo.save(user);
  }
}


note: this injection method is only for typeorm, for other services, we can use the constructor method.

9- connecting service to controller

To connect the service to the controller, we import the service into the controller, and then we use the constructor method to inject the service into the controller, for example:

users.controller.ts
----
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password, body.username);
  }
}

9.5 (Optional) - Entity hooks

Entity hooks are functions that run before or after certain events, for example, we can create a hook that runs before a user is created to hash the password. Here are just a few console logs to show how they work:


users.entity.ts
----
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ default: false })
  isAdmin: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}


10- Writing more services

Here are the rest of the services defined with some notes:

users.service.ts
----
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string, username: string) {
    const user = this.repo.create({ email, password, username });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }
}

notes: you always want to create an entity before saving it, or in the case of an update you want to find the entity first, and then update it. It is possible to update an entity without finding it first, but it is not recommended, your hooks will not run.

Also, Nest.js has a built in NotFoundException that you can use to throw an error if an entity is not found. Other Exceptions can be found here: https://docs.nestjs.com/exception-filters

Also note the params for update, we use the Partial type to make all of the fields optional with the attrs param.

11 - Writing more controllers

Here are the rest of the controllers defined with some notes:


notes:
For update we need to write a new DTO that only has the fields that we want to update, and we need to use the Partial type to make all of the fields optional.

user-update.dto.ts
----
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  username: string;
}
