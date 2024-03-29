import { QuestService } from './quest.service';
import { UpdateQuestDto } from './dto/update-quest.dto';
export declare class QuestController {
    private readonly questService;
    constructor(questService: QuestService);
    getQuestState(req: any): import(".prisma/client").Prisma.Prisma__QuestStateClient<{
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
    updateQuestState(req: any, updateQuestDto: UpdateQuestDto): import(".prisma/client").Prisma.Prisma__QuestStateClient<{
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
