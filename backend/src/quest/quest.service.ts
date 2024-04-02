import { Injectable } from '@nestjs/common';
import { JwtDto } from 'src/auth/dto/jwt.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestService {
  constructor(private readonly prismaService: PrismaService) {}

  createQuestState(userId: string) {
    return this.prismaService.questState.create({
      data: {
        userId,
      },
    });
  }

  getQuestState(user: JwtDto) {
    return this.prismaService.questState.findUnique({
      where: { userId: user.userId },
    });
  }

  updateQuest(user: JwtDto, updateQuestDto: UpdateQuestDto) {
    return this.prismaService.questState.update({
      where: {
        userId: user.userId,
      },
      data: {
        ['quest' + updateQuestDto.pointId]: true,
        hearts: {
          increment: updateQuestDto.hearts,
        },
        stars: {
          increment: updateQuestDto.stars,
        },
      },
    });
  }

  reset(user: JwtDto) {
    return this.prismaService.questState.update({
      where: {
        userId: user.userId,
      },
      data: {
        quest1: false,
        quest2: false,
        quest3: false,
        quest4: false,
        quest5: false,
        quest6: false,
        quest7: false,
        hearts: 3,
        stars: 0,
      },
    });
  }
}
