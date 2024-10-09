import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewListComponent } from './crew-list.component';

describe('CrewListComponent', () => {
  let component: CrewListComponent;
  let fixture: ComponentFixture<CrewListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrewListComponent]
    });
    fixture = TestBed.createComponent(CrewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
