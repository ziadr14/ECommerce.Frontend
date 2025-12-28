import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAccoount } from './active-accoount';

describe('ActiveAccoount', () => {
  let component: ActiveAccoount;
  let fixture: ComponentFixture<ActiveAccoount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveAccoount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveAccoount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
