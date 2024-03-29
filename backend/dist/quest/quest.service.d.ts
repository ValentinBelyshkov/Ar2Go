import { JwtDto } from 'src/auth/dto/jwt.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class QuestService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createQuestState(userId: string): import(".prisma/client").Prisma.Prisma__QuestStateClient<{
        id: number;
        quest1: boolean;
        quest2: boolean;
        quest3: boolean;
        quest4: boolean;
        quest5: boolean;
        quest6: boolean;
        quest7: boolean;
        stars: number;
        hearts: number;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getQuestState(user: JwtDto): import(".prisma/client").Prisma.Prisma__QuestStateClient<{
        id: number;
        quest1: boolean;
        quest2: boolean;
        quest3: boolean;
        quest4: boolean;
        quest5: boolean;
        quest6: boolean;
        quest7: boolean;
        stars: number;
        hearts: number;
        userId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateQuest(user: JwtDto, updateQuestDto: UpdateQuestDto): import(".prisma/client").Prisma.Prisma__QuestStateClient<{
        id: number;
        quest1: boolean;
        quest2: boolean;
        quest3: boolean;
        quest4: boolean;
        quest5: boolean;
        quest6: boolean;
        quest7: boolean;
        stars: number;
        hearts: number;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
