import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

//a Decorator is a function that adds some metadata to the current class or function that it is kind of decorate
@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
