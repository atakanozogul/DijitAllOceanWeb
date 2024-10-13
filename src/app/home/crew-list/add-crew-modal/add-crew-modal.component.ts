import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CrewDataService } from '../../../services/crew-data.service';
import { Crew } from '../../../models/crew.model';

@Component({
  selector: 'app-add-crew-modal',
  templateUrl: './add-crew-modal.component.html',
  styleUrls: ['./add-crew-modal.component.scss']
})
export class AddCrewModalComponent {
  crew: Crew = {
    id: 0,
    firstName: '',
    lastName: '',
    nationality: '',
    title: '',
    daysOnBoard: 0,
    dailyRate: 0,
    currency: '',
    totalIncome: 0,
    certificates: []
  };

  constructor(
    public dialogRef: MatDialogRef<AddCrewModalComponent>,
    private crewDataService: CrewDataService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.crewDataService.addCrew(this.crew);
    this.dialogRef.close(true);
  }
}