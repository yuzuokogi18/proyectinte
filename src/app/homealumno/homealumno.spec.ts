import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homealumno } from './homealumno';

describe('Homealumno', () => {
  let component: Homealumno;
  let fixture: ComponentFixture<Homealumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Homealumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homealumno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
