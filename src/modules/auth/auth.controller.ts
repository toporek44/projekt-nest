// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard'; // This should be implemented to use the LocalStrategy

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // AuthService.login should generate a JWT token for the validated user
    return this.authService.login(req.user); // req.user is attached by Passport after successful validation
  }
}
