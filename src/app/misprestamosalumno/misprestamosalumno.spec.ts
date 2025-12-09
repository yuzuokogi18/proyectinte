import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Misprestamosalumno } from './misprestamosalumno';

describe('Misprestamosalumno', () => {
  let component: Misprestamosalumno;
  let fixture: ComponentFixture<Misprestamosalumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Misprestamosalumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Misprestamosalumno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
