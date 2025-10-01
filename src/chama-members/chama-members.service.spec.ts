import { Test, TestingModule } from '@nestjs/testing';
import { ChamaMembersService } from './chama-members.service';

describe('ChamaMembersService', () => {
  let service: ChamaMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChamaMembersService],
    }).compile();

    service = module.get<ChamaMembersService>(ChamaMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
