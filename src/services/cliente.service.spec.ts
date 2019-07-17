import { TestBed } from '@angular/core/testing';

import { StubClienteService } from './cliente.service';

describe('ClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StubClienteService = TestBed.get(StubClienteService);
    expect(service).toBeTruthy();
  });
});
