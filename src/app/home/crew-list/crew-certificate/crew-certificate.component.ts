// crew-certificates.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crew-certificates',
  templateUrl: './crew-certificate.component.html',
  styleUrls: ['./crew-certificate.component.scss']
})
export class CrewCertificateComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}