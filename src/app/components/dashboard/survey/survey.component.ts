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
import { CreateComponent } from './createUpdate/create/create.component';
import { Tenant } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  //search
  selectedValue: string = "title";
  inputSearch: string = "";
  //select
  field: Search[] = [
    { value: '_id', viewValue: 'Id' },
    { value: 'title', viewValue: 'Title' },
  ];
  surveys = [
    {
      title: 'Khảo sát về sản phẩm A',
      description: 'Đánh giá sản phẩm A của chúng tôi',
      id: 1
    },
    {
      title: 'Khảo sát về sản phẩm B',
      description: 'Đánh giá sản phẩm B của chúng tôi',
      id: 2
    },
    {
      title: 'Khảo sát về dịch vụ C',
      description: 'Đánh giá dịch vụ C của chúng tôi',
      id: 3
    }
  ];
  //expanded
  public columnShowHideList: CustomColumn[] = [];
  datas: Survey[] = [];
  //data table
  columnList: string[] = [];
  columnL = ['id', 'title', 'description'];
  displayedColumns: string[] = [];
  //sort
  @ViewChild(MatSort) sort!: MatSort;
  //panigator
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  limitPage: number;
  numberPage: number;
  length: number | undefined;

  handlePageEvent(event: PageEvent) {
    this.panigator.limitPage = event.pageSize;
    this.panigator.numberPage = event.pageIndex;
    this.getServer(this.panigator.limitPage, this.panigator.numberPage + 1);
    this.length = this.panigator.length;
  }

  selectSurvey(survey: any) {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '1200px',
      maxHeight: '800px',
      data: survey
    });
    dialogRef.afterClosed().subscribe(() => {
      setTimeout(() => {
        this.getList();
      }, 1000)
    });
  }

  constructor(public dialog: MatDialog, private toastr: ToastrService, private panigator: PanigatorService, private router: Router, private serverService: ServerService, private errToastr: ErrorToastrService, private surveyService: SurveyService, private customerService: CustomerService) {
    this.limitPage = panigator.limitPage;
    this.numberPage = panigator.numberPage;
  }

  ngOnInit(): void {
    // this.initializeColumnProperties();
    const typeUser = localStorage.getItem('typeUser') || ""
    if (typeUser === "customer") {
      this.getTenants();
    } else {
      this.getList();
    }
  }
  getList() {
    this.surveyService.getSurveyByUser().subscribe((res: any) => {
      this.datas = res.data
      let count = 1;
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

  getListSurveyByCustomer() {
    this.surveyService.getSurveyByTenantId().subscribe((res: any) => {
      this.datas = res.data
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  getServer(limit: number, num: number) {
    this.datas = [];
  }

  details(element: any) {
    this.router.navigate(['/dashboard/survey', element.idServer])
  }

  openEdit(element: any): void {
  }

  removeData(element: any) {
    // const dialogRef = this.dialog.open(ComfimeDeleteComponent, {
    //   width: '350px',
    //   data: { idServer: element.idServer }
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   setTimeout(() => {
    //     this.getList();
    //   }, 2000);
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue == "") {
      this.getList();
    } else {
      this.datas = [];
      this.serverService.searchField(filterValue, this.selectedValue, this.panigator.limitPage, this.panigator.numberPage + 1).subscribe((res: any) => {
        for (var key in res.data) {
          this.datas.push(res.data[key])
        }
        this.panigator.length = res.totalServer;
        this.length = this.panigator.length;
      })
    }
  }
  change(change: any) {
    if (this.inputSearch == "") {
      this.getServer(this.panigator.limitPage, this.panigator.numberPage + 1);
      this.length = this.panigator.length;
    } else {
      this.datas = [];
      this.serverService.searchField(this.inputSearch, change.value, this.panigator.limitPage, this.panigator.numberPage + 1).subscribe((res: any) => {
        for (var key in res.data) {
          this.datas.push(res.data[key])
        }
        this.panigator.length = res.totalServer;
        this.length = this.panigator.length;
      },
        (err: any) => {
          this.errToastr.errToastr(err);
        }
      )

    }
  }

  //togger
  active: boolean | undefined;
  initializeColumnProperties() {
    this.columnL.forEach((element, index) => {
      if (this.panigator.columnList.indexOf(element) > -1) {
        this.active = true;
      } else {
        this.active = false;
      }
      this.columnShowHideList.push(
      );
    });
  }
  selectedTenantId: string = ""
  tenants: Tenant[] = []
  getTenants() {
    this.customerService.getTenants().subscribe((res: any) => {
      console.log(res)
      if (res.data.length > 0) {
        this.selectedTenantId = res.data[0].tenant_id
        localStorage.setItem("tenantId", this.selectedTenantId)
      }
      console.log(this.selectedTenantId);

      this.tenants = res.data
      this.getListSurveyByCustomer()
    },
      (err: any) => {
        this.router.navigate(['/dashboard']);
        this.errToastr.errToastr(err.error.err);
      }
    )
  }
  onSelectChange(event: any) {
    const selectedValue = event.value;
    localStorage.setItem("tenantId", selectedValue)
    const typeUser = localStorage.getItem('typeUser') || ""
    if (typeUser === "customer") {
      this.getTenants();
    } else {
      this.getList();
    }
  }
}
