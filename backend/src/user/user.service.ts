import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async updateUser(userId: string, newName: string): Promise<void> {
    await this.prismaSerivce.user.update({
      where: { id: userId },
      data: { name: newName },
    });
  }

  async getUser(userId: string): Promise<{ name: string; email: string }> {
    const user = await this.prismaSerivce.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });

    return { name: user.name || '', email: user.email };
  }
}
