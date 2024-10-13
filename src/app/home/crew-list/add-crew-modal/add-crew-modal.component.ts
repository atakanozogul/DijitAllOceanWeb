import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrewDataService } from '../../../services/crew-data.service';
import { Crew } from '../../../models/crew.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-crew-modal',
  templateUrl: './add-crew-modal.component.html',
  styleUrls: ['./add-crew-modal.component.scss']
})
export class AddCrewModalComponent implements OnInit {
  crewForm: FormGroup;

  nationalities: string[] = ['American', 'British', 'Canadian', 'Dutch', 'French'];
  titles: string[] = ['Captain', 'First Officer', 'Engineer', 'Deckhand', 'Steward'];
  currencies: string[] = ['USD', 'EUR', 'GBP'];

  constructor(
    public dialogRef: MatDialogRef<AddCrewModalComponent>,
    private fb: FormBuilder,
    private crewDataService: CrewDataService
  ) {
    this.crewForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      daysOnBoard: [0, [Validators.required, Validators.min(0)]],
      dailyRate: [0, [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required],
      totalIncome: [{ value: 0, disabled: true }]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.crewForm.valid) {
      const crew: Crew = {
        ...this.crewForm.getRawValue(),
        id: uuidv4(),
        certificates: []
      };
      this.crewDataService.addCrew(crew);
      this.dialogRef.close(true);
    }
  }

  calculateTotalIncome(): void {
    const daysOnBoard = this.crewForm.get('daysOnBoard')!.value;
    const dailyRate = this.crewForm.get('dailyRate')!.value;
    if (daysOnBoard >= 0 && dailyRate >= 0) {
      const totalIncome = daysOnBoard * dailyRate;
      this.crewForm.get('totalIncome')?.setValue(totalIncome);
    }
  }
}