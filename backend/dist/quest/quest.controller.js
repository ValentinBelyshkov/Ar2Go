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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestController = void 0;
const common_1 = require("@nestjs/common");
const quest_service_1 = require("./quest.service");
const update_quest_dto_1 = require("./dto/update-quest.dto");
const auth_guard_1 = require("../auth/auth.guard");
let QuestController = class QuestController {
    constructor(questService) {
        this.questService = questService;
    }
    getQuestState(req) {
        return this.questService.getQuestState(req.user);
    }
    resetQuestState(req) {
        return this.questService.reset(req.user);
    }
    updateQuestState(req, updateQuestDto) {
        return this.questService.updateQuest(req.user, updateQuestDto);
    }
};
exports.QuestController = QuestController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "getQuestState", null);
__decorate([
    (0, common_1.Post)('reset'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "resetQuestState", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_quest_dto_1.UpdateQuestDto]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "updateQuestState", null);
exports.QuestController = QuestController = __decorate([
    (0, common_1.Controller)('quests'),
    __metadata("design:paramtypes", [quest_service_1.QuestService])
], QuestController);
//# sourceMappingURL=quest.controller.js.map