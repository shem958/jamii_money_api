import { Test, TestingModule } from '@nestjs/testing';
import { ChamasService } from './chamas.service';

describe('ChamasService', () => {
  let service: ChamasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChamasService],
    }).compile();

    service = module.get<ChamasService>(ChamasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
