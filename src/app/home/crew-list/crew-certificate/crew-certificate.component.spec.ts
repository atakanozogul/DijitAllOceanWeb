import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewCertificateComponent } from './crew-certificate.component';

describe('CrewCertificateComponent', () => {
  let component: CrewCertificateComponent;
  let fixture: ComponentFixture<CrewCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrewCertificateComponent]
    });
    fixture = TestBed.createComponent(CrewCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
