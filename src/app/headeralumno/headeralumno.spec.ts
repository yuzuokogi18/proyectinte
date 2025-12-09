import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headeralumno } from './headeralumno';

describe('Headeralumno', () => {
  let component: Headeralumno;
  let fixture: ComponentFixture<Headeralumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headeralumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Headeralumno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
