import { TestBed } from '@angular/core/testing';

import { RegistroalumnoService} from './registroalumno';

describe('Registroalumno', () => {
  let service: RegistroalumnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroalumnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
