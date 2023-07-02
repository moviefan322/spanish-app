import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
// import { AuthGuard } from 'src/guards/auth.guard';
import session from 'express-session';

interface CustomSession extends session.Session {
  userId: number;
}

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @UseGuards(AuthGuard)
  @Get('/getme')
  async getMe(@CurrentUser() user: User, @Session() session: CustomSession) {
    return session.userId;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(
    @Body() body: CreateUserDto,
    @Session() session: CustomSession,
  ) {
    const user = await this.authService.signup(
      body.email,
      body.password,
      body.username,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: SigninUserDto, @Session() session: CustomSession) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
