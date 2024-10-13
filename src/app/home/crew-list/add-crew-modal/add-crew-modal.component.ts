import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Crew } from '../../../models/crew.model';
import { CrewDataService } from '../../../services/crew-data.service';
import { v4 as uuidv4 } from 'uuid';
import { CertificateDataService } from '../../../services/certificate-data.service';
import { CrewCertificate } from '../../../models/crew-certificate.model';
import { Certificate } from '../../../models/certificate.model';


@Component({
  selector: 'app-add-crew-modal',
  templateUrl: './add-crew-modal.component.html',
  styleUrls: ['./add-crew-modal.component.scss']
})
export class AddCrewModalComponent implements OnInit {
  crewForm: FormGroup;
  isEditMode: boolean = false;
  certificateForm: FormGroup;
  certificates: Certificate[] = [];
  tempCertificates: CrewCertificate[] = [];
  editingCertificateIndex: number | null = null;

  nationalities: string[] = ['American', 'British', 'Canadian', 'Dutch', 'French'];
  titles: string[] = ['Captain', 'First Officer', 'Engineer', 'Deckhand', 'Steward'];
  currencies: string[] = ['USD', 'EUR', 'GBP'];

  constructor(
    public dialogRef: MatDialogRef<AddCrewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Crew | null,
    private fb: FormBuilder,
    private crewDataService: CrewDataService,
    private certificateDataService: CertificateDataService
  ) {
    this.isEditMode = !!data;
    this.crewForm = this.fb.group({
      firstName: [data?.firstName || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      nationality: [data?.nationality || '', Validators.required],
      title: [data?.title || '', Validators.required],
      daysOnBoard: [data?.daysOnBoard || 0, [Validators.required, Validators.min(0)]],
      dailyRate: [data?.dailyRate || 0, [Validators.required, Validators.min(0)]],
      currency: [data?.currency || '', Validators.required],
      discount: 0,
      totalIncome: [{ value: data?.totalIncome || 0, disabled: true }],
      certificates: [[]]
    });
    this.certificateForm = this.fb.group({
      certificateId: ['', Validators.required],
      issueDate: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });

    if (data) {
      this.isEditMode = true;
      this.crewForm.patchValue(data);
      this.tempCertificates = data.certificates || [];
    }
  }

  ngOnInit(): void {
    this.certificates = this.certificateDataService.getCertificates();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.crewForm.valid) {
      const crewData = {
        ...this.crewForm.value,
        id: this.data?.id || uuidv4(),
        certificates: this.tempCertificates
      };
  
      if (this.isEditMode) {
        this.crewDataService.updateCrew(crewData);
      } else {
        this.crewDataService.addCrew(crewData);
      }
  
      this.dialogRef.close(true);
    }
  }

  addOrUpdateCertificate(): void {
    if (this.certificateForm.valid) {
      const certificateId = this.certificateForm.get('certificateId')!.value;
      const issueDate = this.certificateForm.get('issueDate')!.value;
      const expiryDate = this.certificateForm.get('expiryDate')!.value;

      const certificate = this.certificates.find(cert => cert.id === certificateId);
      if (certificate) {
        const crewCertificate: CrewCertificate = {
          certificateId,
          issueDate,
          expiryDate,
          crewId: this.data ? this.data.id : uuidv4()
        };

        if (this.editingCertificateIndex !== null) {
          this.tempCertificates[this.editingCertificateIndex] = crewCertificate;
          this.editingCertificateIndex = null;
        } else {
          this.tempCertificates.push(crewCertificate);
        }

        this.certificateForm.reset();
      }
    }
  }

  getCertificateName(certificateId: number): string {
    const certificate = this.certificateDataService.getCertificateById(certificateId);
    return certificate ? certificate.name : '';
  }

  editCertificate(index: number): void {
    const certificate = this.tempCertificates[index];
    this.certificateForm.patchValue({
      certificateId: certificate.certificateId,
      issueDate: certificate.issueDate,
      expiryDate: certificate.expiryDate
    });
    this.editingCertificateIndex = index;
  }

  removeCertificate(index: number): void {
    this.tempCertificates.splice(index, 1);
  }
}