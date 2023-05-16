import { ifUser } from '../../../../interface/ifUser';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-changeinfouser',
  templateUrl: './changeinfouser.component.html',
  styleUrls: ['./changeinfouser.component.css']
})
export class ChangeinfouserComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private errToastr: ErrorToastrService, private userService: UserService, private toastr: ToastrService, public dialogRef: MatDialogRef<ChangeinfouserComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
    })
  }
  hide = true;
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  complete(): void {

    const dataSer = <ifUser>{
      data: <User>{
        user_id: "",
        full_name: this.form.value.full_name,
        email: this.form.value.email,
      }
    }
    console.log(this.data.user_id)
    this.userService.updateUser(dataSer, this.data.user_id).subscribe((res: any) => {
      this.toastr.success('Update User Succesfull', 'Done');
      this.dialogRef.close();
    },
    (err: any) => {
      this.errToastr.errToastr(err);
      this.form.reset();
    })
  }

}
