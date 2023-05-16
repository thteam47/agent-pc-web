import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Survey, SurveyResult } from 'src/app/interface/survey';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { SurveyService } from 'src/app/services/survey.service';
import { Model } from "survey-core";
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-survey-recommend',
  templateUrl: './survey-recommend.component.html',
  styleUrls: ['./survey-recommend.component.css']
})
export class SurveyRecommendComponent implements OnInit {
  form!: FormGroup;
  data: any = null;
  constructor(
    private fb: FormBuilder,
    public surveyService: SurveyService,
    private errToastr: ErrorToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<SurveyRecommendComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: {
      type: string,
      surveys: Survey[]
    },
  ) {

  }
  showProgressBar = false;
  ngOnInit() {
    this.initForm();
  }

  requestRecommend(result: SurveyResult) {
    if (this.datas.type === "cbf") {
      this.surveyService.getRequestGenarateRecommendUserCbf(result).subscribe((res: any) => {
        this.dialogRef.close(res.data);
        this.showProgressBar = false;
      },
        (err: any) => {
          this.errToastr.errToastr(err.error.err);
        }
      );
    } else if (this.datas.type === "cf") {
      this.surveyService.getRequestGenarateRecommendUserCf(result).subscribe((res: any) => {
        this.dialogRef.close(res.data);
        this.showProgressBar = false;
      },
        (err: any) => {
          this.errToastr.errToastr(err.error.err);
        }
      );
    }
  }

  onSurveyComplete(survey: Model) {
    this.showProgressBar = true;
    const result: SurveyResult = {};
    survey.getAllQuestions().forEach(question => {
      if (question.visible) {

        let choices = question.visibleChoices;
        let selectedChoices: number = 0;
        choices.forEach((choice: any, index: any) => {
          if (choice.value === question.value) {
            selectedChoices = index + 1;
          }
        });
        result[question.name] = selectedChoices;
      }
    });
    this.requestRecommend(result)
  }


  initForm() {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      pages: this.fb.array([])
    })
    let count = 1;
    this.datas.surveys.forEach((item: any) => {
      console.log(item.name);

      const pageGroup = this.fb.group({
        name: item.name,
        title: [item.name],
        elements: this.fb.array([])
      });
      item.questions.forEach((element: any) => {
        const elementGroup = this.fb.group({
          type: "radiogroup",
          title: element.message,
          name: count.toString(),
          choices: this.fb.array(element.answers),
          isRequired: false,
        });
        count++;
        (pageGroup.controls.elements as FormArray).push(elementGroup);
      });
      (this.form.controls.pages as FormArray).push(pageGroup);
    })
    this.data = new Model(this.form.value);
    this.data.onComplete.add(this.onSurveyComplete.bind(this));
  }

}
