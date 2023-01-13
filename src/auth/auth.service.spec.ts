import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';

import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in-input.dto';
import { SignUpInput } from './dto/sign-up-input.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;
  let usersRepo: Repository<User>;

  beforeEach(async () => {
    const jwtServiceMockValue = {
      sign: () => 'mock',
    };
    const JwtServiceMock = {
      provide: JwtService,
      useValue: jwtServiceMockValue,
    };
    const usersServiceMockValue = {
      findOneByUserName: () => 'mock',
    };
    const UsersServiceMock = {
      provide: UsersService,
      useValue: usersServiceMockValue,
    };
    const usersRepoMockValue = {
      save: () => 'mock',
    };
    const UsersRepoMock = {
      provide: 'UserRepository',
      useValue: usersRepoMockValue,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtServiceMock, UsersServiceMock, UsersRepoMock],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
    usersRepo = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should save user with hashed password', async () => {
      const input: SignUpInput = {
        username: 'a',
        email: 'a@example.com',
        phone: '1234567890',
        password: 'secret',
      };
      const result = plainToClass(User, {
        id: 1,
        username: 'a',
        email: 'a@example.com',
      });

      const mockSalt = 'salt';
      const genSaltSync = jest
        .spyOn(bcrypt, 'genSaltSync')
        .mockReturnValue(mockSalt);
      const mockHash = 'hash';
      const hashSync = jest.spyOn(bcrypt, 'hashSync').mockReturnValue(mockHash);
      const save = jest
        .spyOn(usersRepo, 'save')
        .mockReturnValue(new Promise<User>((resolve) => resolve(result)));

      expect(await service.signUp(input)).toBe(result);
      expect(genSaltSync.mock.calls[0][0]).toBe(10);
      expect(hashSync.mock.calls[0][0]).toBe(input.password);
      expect(hashSync.mock.calls[0][1]).toBe(mockSalt);
      const saveInput = { ...input, password: mockHash };
      expect(save.mock.calls[0][0]).toEqual(saveInput);

      genSaltSync.mockRestore();
      hashSync.mockRestore();
      save.mockRestore();
    });
  });

  describe('signIn', () => {
    describe('when the user exists', () => {
      it('should return valid token', async () => {
        const input: SignInInput = {
          username: 'a',
          password: 'secret',
        };
        const user = plainToClass(User, {
          id: 1,
          username: 'a',
          email: 'a@example.com',
        });
        const token = 'j.w.t';
        const result = { ...user, token };

        const findOneByUserName = jest
          .spyOn(usersService, 'findOneByUserName')
          .mockReturnValue(new Promise<User>((resolve) => resolve(user)));

        const compare = (
          jest.spyOn(bcrypt, 'compare') as jest.SpyInstance
        ).mockReturnValue(new Promise<boolean>((resolve) => resolve(true)));
        const sign = jest.spyOn(jwtService, 'sign').mockReturnValue(token);

        expect(await service.signIn(input)).toEqual(result);
        expect(findOneByUserName.mock.calls[0][0]).toBe(input.name);

        findOneByUserName.mockRestore();
        compare.mockRestore();
        sign.mockRestore();
      });
    });

    describe('when the user does not exist', () => {
      it('should return empty token', async () => {
        const input: SignInInput = {
          username: 'a',
          password: 'secret',
        };
        const user = undefined;
        const result = {};

        const findOneByUserName = jest
          .spyOn(usersService, 'findOneByUserName')
          .mockReturnValue(new Promise<undefined>((resolve) => resolve(user)));

        expect(await service.signIn(input)).toEqual(result);
        expect(findOneByUserName.mock.calls[0][0]).toBe(input.name);

        findOneByUserName.mockRestore();
      });
    });

    describe('when the password is invalid', () => {
      it('should return empty token', async () => {
        const input: SignInInput = {
          username: 'a',
          password: 'secret',
        };
        const user = plainToClass(User, {
          id: 1,
          username: 'a',
          email: 'a@example.com',
        });
        const result = {};

        const findOneByUserName = jest
          .spyOn(usersService, 'findOneByUserName')
          .mockReturnValue(new Promise<User>((resolve) => resolve(user)));
        const compare = (
          jest.spyOn(bcrypt, 'compare') as jest.SpyInstance
        ).mockReturnValue(new Promise<boolean>((resolve) => resolve(false)));

        expect(await service.signIn(input)).toEqual(result);
        expect(findOneByUserName.mock.calls[0][0]).toBe(input.name);
        expect(compare.mock.calls[0][0]).toBe(input.password);
        expect(compare.mock.calls[0][1]).toBe(user.password);

        findOneByUserName.mockRestore();
        compare.mockRestore();
      });
    });
  });

  describe('validateUser', () => {
    it('should call usersService.findOneByUserName', async () => {
      const input = {
        id: 1,
        username: 'a',
        email: 'a@example.com',
      };
      const result = plainToClass(User, input);

      const findOneByUserName = jest
        .spyOn(usersService, 'findOneByUserName')
        .mockReturnValue(new Promise<User>((resolve) => resolve(result)));

      expect(await service.validateUser(input)).toEqual(result);
      expect(findOneByUserName.mock.calls[0][0]).toBe(input.name);

      findOneByUserName.mockRestore();
    });
  });
});
