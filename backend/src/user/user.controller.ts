import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('me')
  @UseGuards(AuthGuard)
  async updateUser(
    @Request() req,
    @Body('name') newName: string,
  ): Promise<void> {
    await this.userService.updateUser(req.user.userId, newName);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getUser(@Request() req): Promise<{ name: string; email: string }> {
    return this.userService.getUser(req.user.userId);
  }
}
