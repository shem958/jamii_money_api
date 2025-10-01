import { Test, TestingModule } from '@nestjs/testing';
import { NudgesController } from './nudges.controller';

describe('NudgesController', () => {
  let controller: NudgesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NudgesController],
    }).compile();

    controller = module.get<NudgesController>(NudgesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
