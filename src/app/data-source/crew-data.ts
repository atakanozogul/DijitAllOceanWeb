import { Crew } from "../models/crew.model";

export const crews: Crew[] = [
  {
    id: "1",
    firstName: 'John',
    lastName: 'Doe',
    nationality: 'American',
    title: 'Captain',
    daysOnBoard: 100,
    dailyRate: 500,
    currency: 'USD',
    totalIncome: 50000,
    certificates: [
      { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01', crewId: 1 }
    ]
  },
  {
    id: "2",
    firstName: 'Jane',
    lastName: 'Smith',
    nationality: 'British',
    title: 'First Officer',
    daysOnBoard: 80,
    dailyRate: 400,
    currency: 'GBP',
    totalIncome: 32000,
    certificates: [
      { certificateId: 2, issueDate: '2020-05-01', expiryDate: '2022-05-01', crewId: 2 }
    ]
  },
  {
    id: "3",
    firstName: 'Alice',
    lastName: 'Johnson',
    nationality: 'Canadian',
    title: 'Cooker',
    daysOnBoard: 60,
    dailyRate: 150,
    currency: 'USD',
    totalIncome: 9000,
    certificates: [
      { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01', crewId: 3 },
      { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01', crewId: 3 }
    ]
  },
  {
    id: "4",
    firstName: 'Bob',
    lastName: 'Brown',
    nationality: 'Australian',
    title: 'Mechanic',
    daysOnBoard: 45,
    dailyRate: 170,
    currency: 'EUR',
    totalIncome: 7650,
    certificates: [
      { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01', crewId: 4 },
      { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01', crewId: 4 }
    ]
  },
  {
    id: "5",
    firstName: 'Charlie',
    lastName: 'Davis',
    nationality: 'New Zealander',
    title: 'Deckhand',
    daysOnBoard: 30,
    dailyRate: 140,
    currency: 'USD',
    totalIncome: 4200,
    certificates: [
      { certificateId: 1, issueDate: '2021-01-01', expiryDate: '2023-01-01', crewId: 5 },
      { certificateId: 2, issueDate: '2021-02-01', expiryDate: '2023-02-01', crewId: 5 }
    ]
  }
];
