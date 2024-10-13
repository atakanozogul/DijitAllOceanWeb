import { CrewCertificate } from './crew-certificate.model';

export interface Crew {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  title: string;
  daysOnBoard: number;
  dailyRate: number;
  currency: string;
  totalIncome: number;
  certificates: CrewCertificate[];
}