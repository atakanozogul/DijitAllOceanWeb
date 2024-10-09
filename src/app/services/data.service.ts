import { Injectable } from '@angular/core';
import { Crew } from '../models/crew.model';
import { Certificate } from '../models/certificate.model';
import { CrewCertificate } from '../models/crew-certificate.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private crews: Crew[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      nationality: 'American',
      title: 'Captain',
      daysOnBoard: 100,
      dailyRate: 500,
      currency: 'USD',
      totalIncome: 50000,
      certificates: [
        { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01' }
      ]
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      nationality: 'British',
      title: 'First Officer',
      daysOnBoard: 80,
      dailyRate: 400,
      currency: 'GBP',
      totalIncome: 32000,
      certificates: [
        { certificateId: 2, issueDate: '2020-05-01', expiryDate: '2022-05-01' }
      ]
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      nationality: 'Canadian',
      title: 'Cooker',
      daysOnBoard: 60,
      dailyRate: 150,
      currency: 'USD',
      totalIncome: 9000,
      certificates: [
        { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Brown',
      nationality: 'Australian',
      title: 'Mechanic',
      daysOnBoard: 45,
      dailyRate: 170,
      currency: 'EUR',
      totalIncome: 7650,
      certificates: [
        { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Davis',
      nationality: 'New Zealander',
      title: 'Deckhand',
      daysOnBoard: 30,
      dailyRate: 140,
      currency: 'USD',
      totalIncome: 4200,
      certificates: [
        { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01' },
        { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01' }
      ]
    }
  ];

  private certificates: Certificate[] = [
    { id: 1, name: 'Captain License', desc: 'License for captains' },
    { id: 2, name: 'First Aid', desc: 'First aid certification' },
    { id: 3, name: 'Crew License', desc: 'Crew certification' },
  ];

  constructor() { }

  // CRUD işlemleri

  // Tüm crew'leri getir
  getCrews(): Crew[] {
    return this.crews;
  }

  // Yeni crew ekle
  addCrew(crew: Crew): void {
    this.crews.push(crew);
  }

  // Crew güncelle
  updateCrew(updatedCrew: Crew): void {
    const index = this.crews.findIndex(crew => crew.id === updatedCrew.id);
    if (index !== -1) {
      this.crews[index] = updatedCrew;
    }
  }

  // Crew sil
  deleteCrew(id: number): void {
    this.crews = this.crews.filter(crew => crew.id !== id);
  }

  // Yeni sertifika ekle
  addCertificate(crewId: number, certificate: CrewCertificate): void {
    const crew = this.crews.find(crew => crew.id === crewId);
    if (crew) {
      crew.certificates.push(certificate);
    }
  }

  // Tüm sertifikaları getir
  getCertificates(): Certificate[] {
    return this.certificates;
  }

  getCertificateById(id: number): Certificate | undefined {
    return this.certificates.find(cert => cert.id === id);
  }

  // Yeni sertifika ekle
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