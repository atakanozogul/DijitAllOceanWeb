import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crew } from '../../../models/crew.model';
import { CrewCertificate } from '../../../models/crew-certificate.model';
import { CertificateDataService } from '../../../services/certificate-data.service';

@Component({
  selector: 'app-crew-card',
  templateUrl: './crew-card.component.html',
  styleUrls: ['./crew-card.component.scss']
})
export class CrewCardComponent implements OnInit {
  crew: Crew;
  crewCertificates: any[] = [];

  constructor(private router: Router, private certificateService: CertificateDataService) {
    const navigation = this.router.getCurrentNavigation();
    this.crew = navigation?.extras?.state?.['crew'];
  }

  ngOnInit(): void {
    if (!this.crew) {
      this.router.navigate(['/home/crew-list']);
    } else {
      this.loadCrewCertificates();
    }
  }

  loadCrewCertificates(): void {
    this.crewCertificates = this.crew.certificates.map((cert: CrewCertificate) => {
      const certificateDetails = this.certificateService.getCertificateById(cert.certificateId);
      return {
        ...certificateDetails,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate
      };
    });
  }
}