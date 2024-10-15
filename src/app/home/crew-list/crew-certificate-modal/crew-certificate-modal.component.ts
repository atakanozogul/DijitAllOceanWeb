import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CertificateDataService } from '../../../services/certificate-data.service';
import { CrewCertificate } from '../../../models/crew-certificate.model';

@Component({
  selector: 'app-crew-certificates',
  templateUrl: './crew-certificate-modal.component.html',
  styleUrls: ['./crew-certificate-modal.component.scss']
})
export class CrewCertificateComponent implements OnInit {
  detailedCertificates: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { certificates: CrewCertificate[] },
    private certificateDataService: CertificateDataService
  ) {}

  ngOnInit(): void {
    this.detailedCertificates = this.data.certificates.map(cert => {
      const certificateDetails = this.certificateDataService.getCertificateById(cert.certificateId);
      return {
        ...certificateDetails,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate
      };
    });
  }
}