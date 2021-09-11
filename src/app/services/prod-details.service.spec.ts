import { TestBed } from '@angular/core/testing';

import { ProdDetailsService } from './prod-details.service';

describe('ProdDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdDetailsService = TestBed.get(ProdDetailsService);
    expect(service).toBeTruthy();
  });
});
