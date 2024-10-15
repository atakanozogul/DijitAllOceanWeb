import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CrewDataService } from '../../services/crew-data.service';
import { CertificateDataService } from 'src/app/services/certificate-data.service';
import { Crew } from '../../models/crew.model';
import { CrewCertificateComponent } from './crew-certificate-modal/crew-certificate-modal.component';
import { Router } from '@angular/router';
import { AddCrewModalComponent } from './add-crew-modal/add-crew-modal.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { CrewCertificate } from 'src/app/models/crew-certificate.model';


@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.scss']
})
export class CrewListComponent implements OnInit {
  crews: Crew[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'nationality', 'title', 'daysOnBoard', 'dailyRate', 'currency', 'discount', 'totalIncome', 'certificates', 'actions'];
  dataSource = new MatTableDataSource<Crew>();

  constructor(
    private crewDataService: CrewDataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCrewData();
  }

  openEditDialog(crew: Crew): void {
    const dialogRef = this.dialog.open(AddCrewModalComponent, {
      width: '400px',
      data: crew
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCrewData();
      }
    });
  }

  deleteCrew(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crewDataService.deleteCrew(id);
        this.loadCrewData();
      }
    });
  }

  openCertificatesDialog(certificates: CrewCertificate[]): void {
    this.dialog.open(CrewCertificateComponent, {
      width: '400px',
      data: { certificates }
    });
  }

  loadCrewData(): void {
    this.crews = this.crewDataService.getCrews();
    this.applyDiscount();
    this.dataSource.data = this.crews;
  }

  applyDiscount(): void {
    this.crews.forEach(crew => {
      const discount = crew.discount ? crew.discount / 100 : 0;
      crew.totalIncome = crew.daysOnBoard * crew.dailyRate * (1 - discount);
    });
    this.dataSource.data = this.crews;
  }

  openAddCrewModal(): void {
    const dialogRef = this.dialog.open(AddCrewModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCrewData();
      }
    });
  }

  getTotalIncomeByCurrency(currency: string): number {
    return this.crews
      .filter(crew => crew.currency === currency)
      .reduce((acc, crew) => acc + crew.totalIncome, 0);
  }

  navigateToCrewCard(crew: Crew): void {
    this.router.navigate(['/home/crew-card'], { state: { crew } });
  }
}