import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { Crew } from '../../models/crew.model';
import { Certificate } from '../../models/certificate.model';
import { CrewCertificateComponent } from './crew-certificate/crew-certificate.component';


@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.scss']
})
export class CrewListComponent implements OnInit {
  crews: Crew[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'nationality', 'title', 'daysOnBoard', 'dailyRate', 'currency', 'totalIncome', 'certificates', 'actions'];
  dataSource = new MatTableDataSource<Crew>();

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.crews = this.dataService.getCrews();
    this.dataSource.data = this.crews;
  }

  openEditDialog(crew: Crew): void {
    // Edit dialog açma işlemi
  }

  deleteCrew(id: number): void {
    this.dataService.deleteCrew(id);
    this.crews = this.dataService.getCrews();
    this.dataSource.data = this.crews;
  }

  openCertificatesDialog(certificates: any): void {
    const detailedCertificates = certificates.map((cert: { certificateId: number; issueDate: any; expiryDate: any; }) => {
      const certificateDetails = this.dataService.getCertificateById(cert.certificateId);
      return {
        ...certificateDetails,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate
      };
    });

    this.dialog.open(CrewCertificateComponent, {
      width: '400px',
      data: { certificates: detailedCertificates }
    });
  }

  getTotalIncomeByCurrency(currency: string): number {
    return this.crews
      .filter(crew => crew.currency === currency)
      .reduce((acc, crew) => acc + crew.totalIncome, 0);
  }
}