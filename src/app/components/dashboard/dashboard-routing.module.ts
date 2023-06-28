import { AdminuserComponent } from './adminuser/adminuser.component';
import { AccountComponent } from './account/account.component';
import { NewServerComponent } from './new-server/new-server.component';
import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DetailstatusComponent } from './detailstatus/detailstatus.component';
import { SurveyComponent } from './survey/survey.component';
import { RecommendComponent } from './recommend/recommend.component';
import { SurveyService } from 'src/app/services/survey.service';
import { SurveyRecommendComponent } from './recommend/survey-recommend/survey-recommend/survey-recommend.component';
import { FakeDataComponent } from './fake-data/fake-data.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: SurveyComponent },
      { path: 'account', component: AccountComponent },
      { path: 'newserver', component: NewServerComponent },
      { path: 'user', component: AdminuserComponent },
      { path: 'recommend', component: RecommendComponent },
      { path: 'fake-data', component: FakeDataComponent },
      { path: 'detailstatus/:id', component: DetailstatusComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SurveyService],
})
export class DashboardRoutingModule { }
