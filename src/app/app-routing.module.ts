import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrewListComponent } from './home/crew-list/crew-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/home/crew-list', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
    { path: 'crew-list', component: CrewListComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }