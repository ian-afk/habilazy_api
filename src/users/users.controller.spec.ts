import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            listAllUser: jest
              .fn()
              .mockResolvedValue([{ id: 1, email: 'test@email.com' }]),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should fetch all the users', async () => {
      const users = await controller.getAllUser();
      expect(users).toEqual([{ id: 1, email: 'test@email.com' }]);
    });
  });
});
