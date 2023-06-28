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
import { Tenant } from 'src/app/interface/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { FakeDataService } from 'src/app/services/fake-data.service';

@Component({
  selector: 'app-fake-data',
  templateUrl: './fake-data.component.html',
  styleUrls: ['./fake-data.component.css']
})
export class FakeDataComponent implements OnInit {

  constructor(public dialog: MatDialog, private toastr: ToastrService, private panigator: PanigatorService, private router: Router, private serverService: ServerService, private errToastr: ErrorToastrService, private surveyService: SurveyService, private customerService: CustomerService,  private fakeDataService: FakeDataService) {
  }

  ngOnInit(): void {
    this.getTenants();
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
  }

  genKey() {
    this.fakeDataService.genKey().subscribe((res: any) => {
      this.toastr.success('GenKey Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  doSurvey() {
    this.fakeDataService.doSurvey().subscribe((res: any) => {
      this.toastr.success('doSurvey Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  sendDataOnePart() {
    this.fakeDataService.sendDataOnePart().subscribe((res: any) => {
      this.toastr.success('sendDataOnePart Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  sendDataTwoPart3() {
    this.fakeDataService.sendDataTwoPart3().subscribe((res: any) => {
      this.toastr.success('sendDataTwoPart3 Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  sendDataTwoPart4() {
    this.fakeDataService.sendDataTwoPart4().subscribe((res: any) => {
      this.toastr.success('sendDataTwoPart4 Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  sendDataTwoPart5() {
    this.fakeDataService.sendDataTwoPart5().subscribe((res: any) => {
      this.toastr.success('sendDataTwoPart5 Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
    this.fakeDataService.processData2().subscribe((res: any) => {
    },
      (err: any) => {
      }
    )
  }

  sendDataTwoPart() {
    this.fakeDataService.sendDataTwoPart().subscribe((res: any) => {
      this.toastr.success('sendDataTwoPart Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }

  processData() {
    this.fakeDataService.processData().subscribe((res: any) => {
      this.toastr.success('processData Succesfull', 'Done');
    },
      (err: any) => {
        this.errToastr.errToastr(err);
      }
    )
  }
}
