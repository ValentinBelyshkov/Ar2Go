import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { QuestModule } from './quest/quest.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    {
      ...JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '30d',
        },
      }),
      global: true,
    },
    PrismaModule,
    AuthModule,
    QuestModule,
    UserModule,
  ],
  providers: [UserService],
})
export class AppModule {}
