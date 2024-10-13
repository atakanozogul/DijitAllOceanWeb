import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Crew } from '../../../models/crew.model';
import { CrewDataService } from '../../../services/crew-data.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-crew-modal',
  templateUrl: './add-crew-modal.component.html',
  styleUrls: ['./add-crew-modal.component.scss']
})
export class AddCrewModalComponent implements OnInit {
  crewForm: FormGroup;
  isEditMode: boolean = false;

  nationalities: string[] = ['American', 'British', 'Canadian', 'Dutch', 'French'];
  titles: string[] = ['Captain', 'First Officer', 'Engineer', 'Deckhand', 'Steward'];
  currencies: string[] = ['USD', 'EUR', 'GBP'];

  constructor(
    public dialogRef: MatDialogRef<AddCrewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Crew | null,
    private fb: FormBuilder,
    private crewDataService: CrewDataService
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
      totalIncome: [{ value: data?.totalIncome || 0, disabled: true }]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.crewForm.valid) {
      const crew: Crew = {
        ...this.data,
        ...this.crewForm.getRawValue(),
        id: this.data?.id || uuidv4(),
        certificates: this.data?.certificates || []
      };

      if (this.isEditMode) {
        this.crewDataService.updateCrew(crew);
      } else {
        this.crewDataService.addCrew(crew);
      }

      this.dialogRef.close(true);
    }
  }

  calculateTotalIncome(): void {
    const daysOnBoard = this.crewForm.get('daysOnBoard')!.value;
    const dailyRate = this.crewForm.get('dailyRate')!.value;
    if (daysOnBoard >= 0 && dailyRate >= 0) {
      const totalIncome = daysOnBoard * dailyRate;
      this.crewForm.get('totalIncome')!.setValue(totalIncome);
    }
  }
}