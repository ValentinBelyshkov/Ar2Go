import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { QuestService } from './quest.service';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('quests')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @Get()
  @UseGuards(AuthGuard)
  getQuestState(@Req() req) {
    return this.questService.getQuestState(req.user);
  }

  @Patch()
  @UseGuards(AuthGuard)
  updateQuestState(@Req() req, @Body() updateQuestDto: UpdateQuestDto) {
    return this.questService.updateQuest(req.user, updateQuestDto);
  }
}
