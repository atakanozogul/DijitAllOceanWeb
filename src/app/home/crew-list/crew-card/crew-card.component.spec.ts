import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewCardComponent } from './crew-card.component';

describe('CrewCardComponent', () => {
  let component: CrewCardComponent;
  let fixture: ComponentFixture<CrewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrewCardComponent]
    });
    fixture = TestBed.createComponent(CrewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
