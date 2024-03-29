import { GoogleDto } from './dto/google.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { QuestService } from 'src/quest/quest.service';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly questService;
    constructor(prismaService: PrismaService, jwtService: JwtService, questService: QuestService);
    google(payload: GoogleDto): Promise<{
        sessionId: string;
        refreshToken: string;
        accessToken: string;
    }>;
    generateSalt(): string;
    hashValue(data: string): Promise<string>;
    createSession(user: User): Promise<{
        sessionId: string;
        refreshToken: string;
        accessToken: string;
    }>;
}
