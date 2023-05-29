import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
//26:43
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() dto:any) {
    console.log({
      dto,
    });
    //52:17
    return this.authService.signup()
  }

  @Post('/signin')
  signin() {
    return this.authService.signin()
  }
}
