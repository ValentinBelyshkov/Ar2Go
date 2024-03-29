import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  google() {
    return { status: 'OK' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req, @Res() res) {
    const data = await this.authService.google(req.user);

    res.cookie('refresh_token', data.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.cookie('session_id', data.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.cookie('access_token', data.accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.redirect('/map');
  }
}
