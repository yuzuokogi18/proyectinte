import { TestBed } from '@angular/core/testing';

import { Registroalumno } from './registroalumno';

describe('Registroalumno', () => {
  let service: Registroalumno;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Registroalumno);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
