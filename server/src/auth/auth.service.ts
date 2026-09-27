import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UrfuLoginDto } from '@app/auth/dto/urfuLogin.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@app/user/user.service';
import {sign,verify} from 'jsonwebtoken'
import {compare} from "bcrypt"
import puppeteer from 'puppeteer';
import { JwtPayload } from '@app/auth/interfaces/jwt-payload.interface';



@Injectable()
export class AuthService {
  constructor(private readonly configService:ConfigService,
              @Inject(forwardRef(()=>UserService))
              private readonly userService:UserService
  ) {
  }
  async signUp(signUpDto:UrfuLoginDto){
    const user = await this.userService.create(signUpDto);
    return this.userService.createResponse(user)
  }

  async signIn(signInDto: UrfuLoginDto) {
    const user = await this.userService.findByEmailWithPassword(signInDto.email);
    if (!user) {
      throw new HttpException('Неверный логин или пароль', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = await compare(signInDto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Неверный логин или пароль', HttpStatus.UNAUTHORIZED);
    }
    return this.userService.createResponse(user);
  }

  async demoLogin() {
    if (this.configService.get('DEMO_LOGIN_ENABLED') !== 'true') {
      throw new HttpException('Демо-вход отключён', HttpStatus.FORBIDDEN);
    }
    const user = await this.userService.findByEmail('admin');
    if (!user) {
      throw new HttpException('Демо-аккаунт не найден', HttpStatus.NOT_FOUND);
    }
    return this.userService.createResponse(user, { isDemo: true });
  }

  async loginUrfu(loginuserDto:UrfuLoginDto){
    let browser;
    try {
      browser = await puppeteer.launch({headless:true,defaultViewport:null, args: [
          '--incognito', '--remote-debugging-port=9222'
        ]});
    } catch (e) {
      throw new HttpException(
        'UrFU-логин недоступен: не установлен Chrome для Puppeteer. Используйте демо-режим или локальный вход (admin).',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    const page = await browser.newPage();

    try {
      await page.goto('https://sso.urfu.ru/adfs/OAuth2/authorize?resource=https%3A%2F%2Fistudent.urfu.ru&type=web_server&client_id=https%3A%2F%2Fistudent.urfu.ru&redirect_uri=https%3A%2F%2Fistudent.urfu.ru%2Fstudent%2Flogin%3Fauth&response_type=code&scope=');

      await page.type('#userNameInput', loginuserDto.email);
      await page.type('#passwordInput', loginuserDto.password);
      await Promise.all([

        page.click('#submitButton'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),

      ]);

      const errorElement = await page.$('#errorText');
      if (errorElement) {
        const errorMessage = await page.evaluate(el => el.textContent, errorElement);
        throw new HttpException(`Ошибка авторизации: ${errorMessage}`, HttpStatus.UNAUTHORIZED);
      }
      await page.goto('https://istudent.urfu.ru/student/index')

      const userFIO = (await page.$eval('.main-data h4', el => el.textContent)).replace(/[\n\t]+/g, '').split(' ');
      const [userSurname,userName, userPatronymic] = [...userFIO]
      const userGroup = await page.$eval('.student-data-info p:nth-of-type(2) strong', el => el.nextSibling.textContent.trim());
      const userLevel = Number(userGroup.split('-')[1][0])

      const userByEmail = await this.userService.findByEmail(loginuserDto.email)
      if(userByEmail){
        return this.userService.createResponse(userByEmail)
      }

      const userDto = { ...loginuserDto, surname:userSurname, name: userName, patronymic:userPatronymic, group: userGroup, level: userLevel };
      const user = await this.userService.create(userDto);

      return this.userService.createResponse(user);
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } finally {
      await browser.close();
    }
  }

  async verifyToken(token:string):Promise<UserEntity>{
    try {
      return verify(token,this.configService.get('JWT_KEY'))
    }
    catch (e){
      throw new HttpException('Не удалось декодировать токен', HttpStatus.BAD_REQUEST)
    }
  }

  generateJwt(user: UserEntity, options?: { isDemo?: boolean }): string {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      surname: user.surname,
      name: user.name,
      isDemo: !!options?.isDemo,
    };
    return sign(payload, this.configService.get<string>('JWT_KEY'));
  }
}
