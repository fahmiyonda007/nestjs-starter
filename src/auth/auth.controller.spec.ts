import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { User } from '../users/users.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in-input.dto';
import { SignInResult } from './dto/sign-in-result.dto';
import { SignUpInput } from './dto/sign-up-input.dto';

describe('Auth Controller', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const authServiceMockValue = {
      signUp: () => 'mock',
      signIn: () => 'mock',
    };
    const AuthServiceMock = {
      provide: AuthService,
      useValue: authServiceMockValue,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should call AuthService.signUp', async () => {
      const input: SignUpInput = {
        name: 'a',
        email: 'a@example.com',
        phone: '1234567890',
        password: 'secret',
      };
      const result = plainToClass(User, {
        id: 1,
        name: 'a',
        email: 'a@example.com',
      });

      const rv = new Promise<User>((resolve) => resolve(result));
      const signUp = jest.spyOn(service, 'signUp').mockReturnValue(rv);

      expect(await controller.signUp(input)).toBe(result);
      expect(signUp.mock.calls[0][0]).toBe(input);

      signUp.mockRestore();
    });
  });

  describe('signIn', () => {
    describe('when sign-in is successful', () => {
      it('should return token', async () => {
        const input: SignInInput = {
          name: 'a',
          password: 'secret',
        };
        const result = plainToClass(SignInResult, {
          token: 'a',
        });

        const rv = new Promise<SignInResult>((resolve) => resolve(result));
        const signIn = jest.spyOn(service, 'signIn').mockReturnValue(rv);

        expect(await controller.signIn(input)).toBe(result);
        expect(signIn.mock.calls[0][0]).toBe(input);

        signIn.mockRestore();
      });
    });

    describe('when sign-in failed', () => {
      it('should throw BadRequestException', async () => {
        const input: SignInInput = {
          name: 'a',
          password: 'secret',
        };
        const result = plainToClass(SignInResult, {
          token: '',
        });

        const rv = new Promise<SignInResult>((resolve) => resolve(result));
        const signIn = jest.spyOn(service, 'signIn').mockReturnValue(rv);

        const l = controller.signIn(input);
        await expect(l).rejects.toThrow(BadRequestException);
        expect(signIn.mock.calls[0][0]).toBe(input);

        signIn.mockRestore();
      });
    });
  });
});
