import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createart } from './createart';

describe('Createart', () => {
  let component: Createart;
  let fixture: ComponentFixture<Createart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
