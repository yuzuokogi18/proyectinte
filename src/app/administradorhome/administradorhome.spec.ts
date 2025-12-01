import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Administradorhome } from './administradorhome';

describe('Administradorhome', () => {
  let component: Administradorhome;
  let fixture: ComponentFixture<Administradorhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Administradorhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Administradorhome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
