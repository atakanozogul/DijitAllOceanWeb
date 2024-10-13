import { Injectable } from '@angular/core';
import { Crew } from '../models/crew.model';
import { CrewCertificate } from '../models/crew-certificate.model';
import { crews } from '../data-source/crew-data';

@Injectable({
  providedIn: 'root'
})
export class CrewDataService {

  private crews: Crew[] = crews;

  constructor() { }

  getCrews(): Crew[] {
    return this.crews;
  }

  addCrew(crew: Crew): void {
    this.crews.push(crew);
  }

  updateCrew(updatedCrew: Crew): void {
    const index = this.crews.findIndex(crew => crew.id === updatedCrew.id);
    if (index !== -1) {
      this.crews[index] = updatedCrew;
    }
  }

  deleteCrew(id: string): void {
    this.crews = this.crews.filter(crew => crew.id !== id);
  }

  addCertificate(crewId: string, certificate: CrewCertificate): void {
    const crew = this.crews.find(crew => crew.id === crewId);
    if (crew) {
      crew.certificates.push(certificate);
    }
  }
}