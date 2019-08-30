/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanillaService } from './planilla.service';

describe('Service: Planilla', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanillaService]
    });
  });

  it('should ...', inject([PlanillaService], (service: PlanillaService) => {
    expect(service).toBeTruthy();
  }));
});
