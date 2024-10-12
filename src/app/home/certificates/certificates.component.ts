import { Component } from '@angular/core';
import { CertificateDataService } from '../../services/certificate-data.service';
import { Certificate } from '../../models/certificate.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
  certificates: Certificate[] = [];
  newCertificate: { name: string, desc: string } = { name: '', desc: '' };
  displayedColumns: string[] = ['name', 'desc', 'actions'];

  constructor(private certificateService: CertificateDataService) {
    this.certificates = this.certificateService.getCertificates();
  }

  addCertificate() {
    if (this.newCertificate.name && this.newCertificate.desc) {
      this.certificateService.addNewCertificate(this.newCertificate);
      this.newCertificate = { name: '', desc: '' };
      this.certificates = this.certificateService.getCertificates();
    }
  }

  deleteCertificate(id: number) {
    this.certificateService.deleteCertificate(id);
    this.certificates = this.certificateService.getCertificates();
  }
}