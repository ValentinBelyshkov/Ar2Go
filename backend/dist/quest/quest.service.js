"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuestService = class QuestService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createQuestState(userId) {
        return this.prismaService.questState.create({
            data: {
                userId,
            },
        });
    }
    getQuestState(user) {
        return this.prismaService.questState.findUnique({
            where: { userId: user.userId },
        });
    }
    updateQuest(user, updateQuestDto) {
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
};
exports.QuestService = QuestService;
exports.QuestService = QuestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestService);
//# sourceMappingURL=quest.service.js.map