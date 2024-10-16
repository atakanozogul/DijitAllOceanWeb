import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CertificateDataService } from '../../services/certificate-data.service';
import { Certificate } from '../../models/certificate.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDeleteComponent } from '../crew-list/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  certificates!: MatTableDataSource<Certificate>;
  displayedColumns: string[] = ['name', 'desc', 'actions'];
  showAddForm: boolean = false;
  certificateForm: FormGroup;

  constructor(
    private certificateService: CertificateDataService, 
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.certificateForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCertificates();
  }

  loadCertificates(): void {
    this.certificates = new MatTableDataSource(this.certificateService.getCertificates());
  }

  deleteCertificate(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.certificateService.deleteCertificate(id);
        this.loadCertificates();
      }
    });
  }

  addCertificate(): void {
    if (this.certificateForm.valid) {
      const newCertificate: Certificate = this.certificateForm.value;
      this.certificateService.addNewCertificate(newCertificate);
      this.certificateForm.reset();
      this.loadCertificates();
      this.showAddForm = false;
    }
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }
}