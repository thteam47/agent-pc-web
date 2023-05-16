import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Survey } from 'src/app/interface/survey';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { SurveyService } from 'src/app/services/survey.service';
import { Model } from "survey-core";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  types: Array<{ text: string; value: string }> = [
    {
      text: 'Text',
      value: 'text'
    },
    {
      text: 'Checkboxes',
      value: 'checkbox'
    },
    {
      text: 'RadioGroup',
      value: 'radiogroup'
    }
  ]

  data: any = null;
  values: any = {};
  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private errToastr: ErrorToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public survey: Survey
  ) { }

  ngOnInit() {
    console.log("safsfgsaf");

    console.log(this.survey);

    this.initForm();
    // this.form.valueChanges.subscribe(val => {
    //   console.log(val);

    // })
  }

  get pages(): FormArray {
    return this.form.get('pages') as FormArray;
  }

  getElements(pageIndex: number): FormArray {
    return ((this.form.get('pages') as FormArray).controls[pageIndex] as FormGroup).controls.elements as FormArray
  }

  getChoices(pageIndex: number, elementIndex: number) {
    return ((((this.form.get('pages') as FormArray).controls[pageIndex] as FormGroup).controls.elements as FormArray).controls[elementIndex] as FormGroup).controls.choices as FormArray
  }

  preview() {
    this.data = new Model(this.form.value);
    this.data.onComplete.add(this.onSurveyComplete);
    this.data.onValueChanged.add((survey: any, options: any) => {
      console.log(survey.data.favoritePet);
      this.values[options.name] = options.value;
      const element = survey.getQuestionByName(options.name);
      if (element && element.id) {
        this.values[element.id] = options.value; // lưu giá trị và id
      }
    });
    this.data.onComplete.add((survey: any, options: any) => {
      console.log("Survey completed!", this.values);
    });
  }

  onSurveyComplete(survey: Model) {
    const questions = survey.getAllQuestions();

    //     const answers = questions.reduce((acc, q) => {
    //       if (q.hasSelectAll) {
    //         const choices = q.getAllSelectedItems().map((choice: {
    //           [x: string]: any; item: any; 
    // }) => ({
    //           questionName: q.name,
    //           choiceOrder: choice.itemIndex,
    //           choiceValue: choice.item.value
    //         }));
    //         return acc.concat(choices);
    //       } else if (q.selectedItem) {
    //         return acc.concat({
    //           questionName: q.name,
    //           choiceOrder: q.selectedItem.itemIndex,
    //           choiceValue: q.selectedItem.value
    //         });
    //       } else {
    //         return acc;
    //       }
    //     }, []);
    //console.log(answers);
  }

  addOption(pageIndex: number, elementIndex: number) {
    this.getChoices(pageIndex, elementIndex).push(new FormControl(''));
  }

  initForm() {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      pages: this.fb.array([
        this.fb.group({
          name: this.survey.name,
          title: [this.survey.name],
          elements: this.fb.array([])
        }),
      ])
    })
    this.survey.questions.forEach((element: any) => {
      const elementGroup = this.fb.group({
        type: ['radiogroup'],
        name: [element.po],
        title: [element.message],
        isRequired: [false],
        choices: this.fb.array(element.answers.map((answer: any) => this.fb.group({
          value: [answer],
          text: [answer]
        })))
      });
      const elements = (this.form.controls.pages as FormArray).at(0).get('elements') as FormArray;
      elements.push(elementGroup);
    });
    this.data = new Model(this.form.value);
  }


  addNew() {
    // call api save json
  }
}
