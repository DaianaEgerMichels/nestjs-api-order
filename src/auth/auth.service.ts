import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// users for testing, in production should be stored in database
const users = [
  {
    username: 'admin',
    password: 'admin',
    id: 1,
  },
  {
    username: 'user',
    password: 'user',
    id: 2,
  },
  {
    username: 'guest',
    password: 'guest',
    id: 3,
  },
];
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  login(username: string, password: string) {
    const user = users.find((user) => user.username === username && user.password === password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
