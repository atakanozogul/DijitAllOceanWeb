import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CrewDataService } from '../../../services/crew-data.service';
import { Crew } from '../../../models/crew.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-crew-modal',
  templateUrl: './add-crew-modal.component.html',
  styleUrls: ['./add-crew-modal.component.scss']
})
export class AddCrewModalComponent implements OnInit {
  crew: Crew = {
    id: "0",
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

  nationalities: string[] = ['American', 'British', 'Canadian', 'Dutch', 'French'];
  titles: string[] = ['Captain', 'First Officer', 'Engineer', 'Deckhand', 'Steward'];
  currencies: string[] = ['USD', 'EUR', 'GBP'];

  constructor(
    public dialogRef: MatDialogRef<AddCrewModalComponent>,
    private crewDataService: CrewDataService
  ) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.crew.id = uuidv4();
    this.crewDataService.addCrew(this.crew);
    this.dialogRef.close(true);
  }

  calculateTotalIncome(): void {
    if (this.crew.daysOnBoard && this.crew.dailyRate) {
      this.crew.totalIncome = this.crew.daysOnBoard * this.crew.dailyRate;
      // Currency conversion logic can be added here if needed
    }
  }
}