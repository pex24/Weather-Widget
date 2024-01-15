import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperDisplayComponent } from './upper.display.component';

describe('UpperDisplayComponent', () => {
  let component: UpperDisplayComponent;
  let fixture: ComponentFixture<UpperDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpperDisplayComponent]
    });
    fixture = TestBed.createComponent(UpperDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
