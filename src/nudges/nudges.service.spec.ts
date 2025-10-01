import { Test, TestingModule } from '@nestjs/testing';
import { NudgesService } from './nudges.service';

describe('NudgesService', () => {
  let service: NudgesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NudgesService],
    }).compile();

    service = module.get<NudgesService>(NudgesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
