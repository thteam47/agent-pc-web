import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatTableDataSource } from "@angular/material/table";
import { Survey } from "../../../interface/survey";
import { Search } from "../../../interface/search";
import { CustomColumn } from "../../../interface/customColumn";
import { MatListModule } from '@angular/material/list';
import { MatSort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { PanigatorService } from "../../../services/panigator.service";
import { Router } from "@angular/router";
import { ServerService } from "../../../services/server.service";
import { ErrorToastrService } from "../../../services/error-toastr.service";
import { SurveyService } from 'src/app/services/survey.service';
import { Category, CategoryRecommend } from 'src/app/interface/category';
import { SurveyRecommendComponent } from './survey-recommend/survey-recommend/survey-recommend.component';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  constructor(public dialog: MatDialog, private toastr: ToastrService, private panigator: PanigatorService, private router: Router, private serverService: ServerService, private errToastr: ErrorToastrService, private surveyService: SurveyService,) {
  }

  datas: Category[] = [];

  datasRecommendCbf: CategoryRecommend[] = [];

  datasRecommendCf: CategoryRecommend[] = [];

  surveys: Survey[] = [];
  ngOnInit(): void {
    // this.initializeColumnProperties();
    this.getList();
  }

  getList() {
    this.surveyService.getCategoryByReommendTenant().subscribe((res: any) => {
      this.datas = res.data
      let count = 1;
      console.log(this.datas);

      // res.data.forEach((item: any) => {
      //   const pageGroup = this.fb.group({
      //     name: item.name,
      //     elements: this.fb.array([])
      //   });
      //   item.questions.forEach((element: any) => {
      //     const elementGroup = this.fb.group({
      //       type: "radiogroup",
      //       title: element.message,
      //       name: count.toString(),
      //       choices: this.fb.array(element.answers),
      //       isRequired: false,
      //     });
      //     count++;
      //     (pageGroup.controls.elements as FormArray).push(elementGroup);
      //   });
      //   (this.form.controls.pages as FormArray).push(pageGroup);
      // });
    },
      (err: any) => {
        //this.router.navigate(['/dashboard']);
        this.errToastr.errToastr(err);
      }
    )
  }
  recommendcbf() {
    this.surveyService.getSurveyByTenant().subscribe((res: any) => {
      const dialogRef = this.dialog.open(SurveyRecommendComponent, {
        width: '1200px',
        maxHeight: '800px',
        data: {
          type: "cbf",
          surveys: res.data,
        },
        disableClose: true,
      });
      dialogRef.componentInstance.surveyService = this.surveyService;
      dialogRef.afterClosed().subscribe((result) => {        
          this.datasRecommendCbf = result
      });
      dialogRef.afterClosed().toPromise().then(() => {
        console.log('dialog closed');
      });
    },
      (err: any) => {
        //this.router.navigate(['/dashboard']);
        this.errToastr.errToastr(err);
      }
    )
  }

  recommendcf() {
    this.surveyService.getSurveyByTenant().subscribe((res: any) => {
      const dialogRef = this.dialog.open(SurveyRecommendComponent, {
        width: '1200px',
        maxHeight: '800px',
        data: {
          type: "cf",
          surveys: res.data,
        },
        disableClose: true,
      });
      dialogRef.componentInstance.surveyService = this.surveyService;
      dialogRef.afterClosed().subscribe((result) => {        
          this.datasRecommendCf = result
      });
    },
      (err: any) => {
        //this.router.navigate(['/dashboard']);
        this.errToastr.errToastr(err);
      }
    )

  }
}
