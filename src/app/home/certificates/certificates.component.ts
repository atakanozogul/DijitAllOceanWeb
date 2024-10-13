import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CertificateDataService } from '../../services/certificate-data.service';
import { Certificate } from '../../models/certificate.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  certificates!: MatTableDataSource<Certificate>;
  displayedColumns: string[] = ['name', 'desc', 'actions'];
  newCertificate: Certificate = { id: 0, name: '', desc: '' };
  showAddForm: boolean = false;

  constructor(private certificateService: CertificateDataService) {}

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.certificates = new MatTableDataSource(this.certificateService.getCertificates());
  }

  deleteCertificate(id: number): void {
    this.certificateService.deleteCertificate(id);
    this.loadCertificates();
  }

  addCertificate(): void {
    this.certificateService.addNewCertificate(this.newCertificate);
    this.newCertificate = { id: 0, name: '', desc: '' };
    this.loadCertificates();
    this.showAddForm = false;
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }
}