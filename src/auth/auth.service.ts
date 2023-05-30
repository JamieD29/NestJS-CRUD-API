import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
//import {User, Bookmark} from '@prisma/client';
@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {
    }
  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password)
   try {
     //save the new user in the db
     const user = await this.prisma.user.create({
       data: {
         email: dto.email,
         hash,
         first_name: dto.first_name,
         last_name: dto.last_name,
       },
     });
     delete user.hash;
     //return the saved user
     return user;
   } catch (error) {
     if (error instanceof Prisma.PrismaClientKnownRequestError) { 
       if (error.code === 'P2002') {
         throw new ForbiddenException('Credentials taken');
       } 
     }else{
      throw error;
     }
   }
  }
  signin() {
    return { msg: 'i have signed in' }
  }
}
