import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editart } from './editart';

describe('Editart', () => {
  let component: Editart;
  let fixture: ComponentFixture<Editart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
