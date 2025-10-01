import { Test, TestingModule } from '@nestjs/testing';
import { ChamaMembersController } from './chama-members.controller';

describe('ChamaMembersController', () => {
  let controller: ChamaMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChamaMembersController],
    }).compile();

    controller = module.get<ChamaMembersController>(ChamaMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
