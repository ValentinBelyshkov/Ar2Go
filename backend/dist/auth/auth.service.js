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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("../utils");
const quest_service_1 = require("../quest/quest.service");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, questService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.questService = questService;
    }
    async google(payload) {
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
    hashValue(data) {
        return bcrypt.hash(data, this.generateSalt());
    }
    async createSession(user) {
        const refreshToken = (0, utils_1.createRandomString)(256);
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
        return {
            sessionId: session.id,
            refreshToken,
            accessToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        quest_service_1.QuestService])
], AuthService);
//# sourceMappingURL=auth.service.js.map