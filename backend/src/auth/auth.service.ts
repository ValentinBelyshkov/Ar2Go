import { Injectable } from '@nestjs/common';
import { GoogleDto } from './dto/google.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createRandomString } from 'src/utils';
import { User } from '@prisma/client';
import { QuestService } from 'src/quest/quest.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly questService: QuestService,
  ) {}

  async google(payload: GoogleDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      const newUser = await this.prismaService.user.create({
        data: {
          email: payload.email,
          name: payload.displayName,
        },
      });

      await this.questService.createQuestState(newUser.id);

      return this.createSession(newUser);
    }

    return this.createSession(user);
  }

  generateSalt() {
    return bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
  }

  hashValue(data: string) {
    return bcrypt.hash(data, this.generateSalt());
  }

  async createSession(user: User) {
    const refreshToken = createRandomString(256);

    const accessToken = this.jwtService.sign({
      userId: user.id,
      name: user.name,
    });

    const session = await this.prismaService.session.create({
      data: {
        userId: user.id,
        refreshToken: await this.hashValue(refreshToken),
      },
    });

    // TODO: Add expire of session
    return {
      sessionId: session.id,
      refreshToken,
      accessToken,
    };
  }
}
