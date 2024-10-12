import { Injectable } from '@angular/core';
import { Certificate } from '../models/certificate.model';
import { certificates } from '../data-source/certificate-data';

@Injectable({
  providedIn: 'root'
})
export class CertificateDataService {

  private certificates: Certificate[] = certificates;

  constructor() { }

  getCertificates(): Certificate[] {
    return this.certificates;
  }

  getCertificateById(id: number): Certificate | undefined {
    return this.certificates.find(cert => cert.id === id);
  }

  addNewCertificate(certificate: { name: string, desc: string }) {
    const newCertificate = {
      id: this.certificates.length + 1,
      ...certificate
    };
    this.certificates.push(newCertificate);
  }

  deleteCertificate(id: number): void {
    this.certificates = this.certificates.filter(cert => cert.id !== id);
  }
}