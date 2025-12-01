import { TestBed } from '@angular/core/testing';

import { Loginalumno } from './loginalumno';

describe('Loginalumno', () => {
  let service: Loginalumno;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loginalumno);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
