1-

CLI:
-nest g module xxx
-nest g controller xxx
-nest g service xxx

2- (for connecting TypeOrm & Sqlite)

First, we need to install the following packages:

## app.module.ts

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

## user.entity.ts

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

## users.module.ts

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

## app.module.ts

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

## main.ts

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

## create-user.dto.ts

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

## users.controller.ts

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

## users.service.ts

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

## users.controller.ts

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

## users.entity.ts

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

## users.service.ts

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

note about Exception errors:
They only work with HTTP protocols, so if you are using a different protocol, you will need to create your own exceptions.

Also note the params for update, we use the Partial type to make all of the fields optional with the attrs param.

11 - Writing more controllers

Here are the rest of the controllers defined with some notes:

notes:
For update we need to write a new DTO that only has the fields that we want to update, and we need to use the Partial type to make all of the fields optional.

## user-update.dto.ts

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

12 - Interceptors

Interceptors are functions that run before or after a request is handled by a controller. They are useful for logging, or for transforming the response. In this setup, I want to exclude the password from the response, so I can use an interceptor to do that:

First, add the '@Exclude()' decorator to the password field in the user entity:

## user.entity.ts

import {
AfterInsert,
AfterUpdate,
AfterRemove,
Entity,
Column,
PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number;

@Column()
email: string;

@Column()
@Exclude()
password: string;

@Column()
username: string;

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

Then, we can pass the class serializer interceptor to the controller method that we want to use it on:

@UseInterceptors(ClassSerializerInterceptor)
@Get('/:id')
async findUser(@Param('id') id: string) {
console.log('handler is running');
const user = await this.usersService.findOne(parseInt(id));
if (!user) {
throw new NotFoundException('user not found');
}
return user;
}

note: this is not the best way to handle this, because it will exclude the password from all responses, even if we want to include it in some responses. A better way to handle this would be to create a custom interceptor that we can pass a param to, and then we can use that param to determine whether or not to exclude the password.

Here is how to implement a custom interceptor:

First, we write a custom DTO that we can use to pass the param to the interceptor:

user.dto.ts
import { Expose } from 'class-transformer';

export class UserDto {
@Expose()
id: number;

@Expose()
email: string;

@Expose()
username: string;
}

the name user.dto.ts is named as such to let other developers know that this is the public facing DTO, and that the password is not included.

note: With a custom interceptor, we no longer need the @Exclude() decorator on the password field in the user entity.

Then, we write the interceptor:

## serialize.interceptor.ts

import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
return handler.handle().pipe(
map((data: any) => {
return plainToInstance(UserDto, data, {
excludeExtraneousValues: true,
});
}),
);
}
}

this code is kind of hectic, but the basic setup of an interceptor is to implement the NestInterceptor interface, and then define the intercept method. The intercept method takes in the context and the handler, and then returns an observable. The handler is the method that is being intercepted, and the context is the context of the request. In this case, we are using the handler to get the data from the request, and then we are using the context to get the request object, and then we are using the request object to get the query params. Then, we are using the query params to determine whether or not to exclude the password from the response.

Then, we can use the interceptor in the controller:

## users.controller.ts

@UseInterceptors(SerializeInterceptor)
@Get('/:id')
async findUser(@Param('id') id: string) {
console.log('handler is running');
const user = await this.usersService.findOne(parseInt(id));
if (!user) {
throw new NotFoundException('user not found');
}
return user;
}

However, this is not the best way to handle this, because we are hard coding the DTO into the interceptor, and we want to be able to pass the DTO as a param to the interceptor. To do this, we need to create a refactor the interceptor so that it takes in a param, and then we can pass the DTO as a param to the interceptor:

## serialize.interceptor.ts

export class SerializeInterceptor implements NestInterceptor {
constructor(private dto: any) {}
intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
return handler.handle().pipe(
map((data: any) => {
return plainToInstance(this.dto, data, {
excludeExtraneousValues: true,
});
}),
);
}
}

Then we can implement it on the route and pass the DTO in as a param:

## users.controller.ts

@UseInterceptors(new SerializeInterceptor(UserDto))
@Get('/:id')
async findUser(@Param('id') id: string) {
console.log('handler is running');
const user = await this.usersService.findOne(parseInt(id));
if (!user) {
throw new NotFoundException('user not found');
}
return user;
}

There is one more way to optimize this, and that is to use a decorator to pass the DTO to the interceptor. This is a little more complicated, but it is the best way to handle this:

## serialize.decorator.ts

export function Serialize(dto: any) {
return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
constructor(private dto: any) {}
intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
return handler.handle().pipe(
map((data: any) => {
return plainToInstance(this.dto, data, {
excludeExtraneousValues: true,
});
}),
);
}
}

then we can use the decorator on the route:

## users.controller.ts

@Serialize(UserDto)
@Get('/:id')
async findUser(@Param('id') id: string) {
console.log('handler is running');
const user = await this.usersService.findOne(parseInt(id));
if (!user) {
throw new NotFoundException('user not found');
}
return user;
}

13 - Authentication

Now that all of that is out of the way, we can begin implementing authentication. Fist, we add an auth service and connect it to the user service:

## auth.service.ts

import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
constructor(private usersService: UsersService) {}
}

Then we add it as a provider in the users module:

## users.module.ts

@Module({
imports: [TypeOrmModule.forFeature([User])],
controllers: [UsersController],
providers: [UsersService, AuthService],
})
export class UsersModule {}

We can begin to implement some validation in the auth service, and create a signup method:

## auth.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as \_scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(\_scrypt);

@Injectable()
export class AuthService {
constructor(private usersService: UsersService) {}

async signup(email: string, password: string, username: string) {
const users = await this.usersService.find(email);
if (users.length) {
throw new BadRequestException('email in use');
}

    // Hash the user's password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it

    const user = await this.usersService.create(email, result, username);

    // Return the user
    return user;

}
}

then, we can refactor the signup method to use the create method from the user service:

## auth.service.ts

@Post('/signup')
async createUser(@Body() body: CreateUserDto) {
return this.authService.signup(body.email, body.password, body.username);
}

note: the user service is still handling the signup at the end of the day, but we are routing the signup through the auth service for verification and to hash the password.

Then, we can create a signin method to the authservice:

## auth.service.ts

---

async signin(email: string, password: string) {
const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }

    return user;

}

and of course we need to add it to the controller:

## users.controller.ts

---

@Post('/signin')
async signin(@Body() body: CreateUserDto) {
return this.authService.signin(body.email, body.password);
}

14 - Cookies

Now we can implement cookies with the nest session decorator. Using the session decorator, we can set a cookie on the client side, and then we can use the session decorator to access the cookie on the server side.

First, we need to install the session package:

## main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
const app = await NestFactory.create(AppModule);
app.use(
cookieSession({
keys: ['poop'],
}),
);
app.useGlobalPipes(
new ValidationPipe({
whitelist: true,
}),
);
await app.listen(3000);
}
bootstrap();

note: for the cookie-session package you need to use require instead of import

Then, we can use the session decorator in the controller:

## users.controller.ts

@Post('/signup')
async createUser(@Body() body: CreateUserDto, @Session() session: any) {
const user = await this.authService.signup(
body.email,
body.password,
body.username,
);
session.userId = user.id;
return user;
}

@Post('/signin')
async signin(@Body() body: CreateUserDto, @Session() session: any) {
const user = await this.authService.signin(body.email, body.password);
session.userId = user.id;
return user;
}

Now that we have cookies implemented, we can create a route to retrieve the user from the cookie, as well as a route to sign out the user:

## users.controller.ts

@Get('/getme')
async getMe(@Session() session: any) {
return this.usersService.findOne(session.userId);
}

@Post('/signout')
async signout(@Session() session: any) {
session.userId = null;
}

we can streamline this a little bit by creating a decorator to handle the session:

## current-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
(data: never, context: ExecutionContext) => {
const request = context.switchToHttp().getRequest();
return request.currentUser;
},
);

the decorator attaches the user to the request object, then we can access it with an interceptor:

import {
NestInterceptor,
ExecutionContext,
CallHandler,
Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
constructor(private usersService: UsersService) {}

async intercept(context: ExecutionContext, handler: CallHandler) {
const request = context.switchToHttp().getRequest();

    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();

}
}

We can hook it up to our controller like this:

## users.controller.ts

---

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
constructor(
private usersService: UsersService,
private authService: AuthService,
) {}

@Get('/getme')
async getMe(@CurrentUser() user: User) {
return user;
}

then we can add the interceptor to the user module:

## users.module.ts

---

@Module({
imports: [TypeOrmModule.forFeature([User])],
controllers: [UsersController],
providers: [UsersService, AuthService, CurrentUserInterceptor],
})
export class UsersModule {}

Alternatively, we can scope the interceptor to the entire users module with the APP_INTERCEPTOR token:

## users.module.ts

---

@Module({
imports: [TypeOrmModule.forFeature([User])],
controllers: [UsersController],
providers: [
UsersService,
AuthService,
{
provide: APP_INTERCEPTOR,
useClass: CurrentUserInterceptor,
},
],
})
export class UsersModule {}

note: If we do it this way, we no longer need to use the @UseInterceptors decorator in the controller.

15- Guards

Guards are used to protect routes. We can use guards to check if a user is logged in, or if a user has admin privileges, etc.

We write a new auth guard:

## auth.guard.ts

import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
canActivate(context: ExecutionContext) {
const request = context.switchToHttp().getRequest();
return request.session.userId;
}
}

then, with the UseGuards decorator, we can protect routes:

## users.controller.ts

---

@Get('/getme')
@UseGuards(AuthGuard)
async getMe(@CurrentUser() user: User) {
return user;
