import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginalumno } from './loginalumno';

describe('Loginalumno', () => {
  let component: Loginalumno;
  let fixture: ComponentFixture<Loginalumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginalumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loginalumno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
