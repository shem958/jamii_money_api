import { Test, TestingModule } from '@nestjs/testing';
import { ChamasController } from './chamas.controller';

describe('ChamasController', () => {
  let controller: ChamasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChamasController],
    }).compile();

    controller = module.get<ChamasController>(ChamasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
