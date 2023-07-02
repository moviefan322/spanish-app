import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { FlashcardsService } from 'src/flashcards/flashcards.service';
import { StatsService } from 'src/stats/stats.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private flashcardsService: FlashcardsService,
    private statsService: StatsService,
  ) {}

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

  async validateUser(email: string, password: string) {
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

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const rawUser = await this.usersService.findOne(payload.sub);
    const currentUser = {
      id: rawUser.id,
      email: rawUser.email,
      username: rawUser.username,
    };
    return {
      currentUser,
      access_token: this.jwtService.sign(payload),
      flashcards: await this.flashcardsService.findFlashcards(currentUser.id),
      stats: await this.statsService.findStats(currentUser.id),
    };
  }

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
}
