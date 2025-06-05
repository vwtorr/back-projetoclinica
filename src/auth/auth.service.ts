import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmail(email);
    const match = await argon2.verify(user?.password, pass);
    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.name,
      role: user?.role?.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
