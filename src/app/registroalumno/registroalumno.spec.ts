import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registroalumno } from './registroalumno';

describe('Registroalumno', () => {
  let component: Registroalumno;
  let fixture: ComponentFixture<Registroalumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registroalumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registroalumno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
