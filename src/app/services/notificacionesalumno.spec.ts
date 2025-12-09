import { TestBed } from '@angular/core/testing';

import { Notificacionesalumno } from './notificacionesalumno';

describe('Notificacionesalumno', () => {
  let service: Notificacionesalumno;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Notificacionesalumno);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
