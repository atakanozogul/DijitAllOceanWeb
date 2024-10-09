import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrewListComponent } from './home/crew-list/crew-list.component';
import { CertificatesComponent } from './home/certificates/certificates.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/crew-list', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
    { path: 'crew-list', component: CrewListComponent },
    { path: 'certificates', component: CertificatesComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }