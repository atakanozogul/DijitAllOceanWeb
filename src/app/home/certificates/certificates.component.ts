import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
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

  constructor(private dataService: DataService) {
    this.certificates = this.dataService.getCertificates();
  }

  addCertificate() {
    if (this.newCertificate.name && this.newCertificate.desc) {
      this.dataService.addNewCertificate(this.newCertificate);
      this.newCertificate = { name: '', desc: '' };
      this.certificates = this.dataService.getCertificates();
    }
  }

  deleteCertificate(id: number) {
    this.dataService.deleteCertificate(id);
    this.certificates = this.dataService.getCertificates();
  }
}