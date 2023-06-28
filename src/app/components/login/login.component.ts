import { SiblingService } from 'src/app/services/sibling.service';
import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AuthenInfo } from 'src/app/interface/authenInfo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  loading = false;
  constructor(private fb: FormBuilder, private sibling: SiblingService, private _snackBar: MatSnackBar, private router: Router, private toastr: ToastrService, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      domain: [''],
    })

  }

  ngOnInit(): void {
    localStorage.removeItem('tokenAgent');
    localStorage.removeItem('role');
    localStorage.removeItem('tenantId');
    localStorage.removeItem('typeUser');
    this.userService.prepareLogin("").subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('tokenAgent', res.token_agent)
    },
    (err: any) => {
      console.log(err);
      
      this.error(err.error.message);
      this.form.reset();
    })
  }

  login() {
    const username = this.form.value.username;
    const password = this.form.value.password;
    const domain = this.form.value.domain;
    const tokenAgent = localStorage.getItem('tokenAgent') || ""
    const authenInfo = <AuthenInfo>{
      ctx: {
        domain_id: "default",
        token_agent: tokenAgent,
      },
      type: "UsernamePassword",
      username: username,
      password: password,
      domain: domain,
    }
    this.userService.loginAdmin(authenInfo).subscribe((res: any) => {
      console.log("res", res);
      if (res.error_code === 0) {
        this.userService.prepareLogin(tokenAgent).subscribe((res: any) => {
          console.log("res", res);
          localStorage.setItem('tokenAgent', res.token_agent)
          if (domain === "") {
            localStorage.setItem('typeUser', "customer")
          }
          if (res.type_mfa !== "") {
            // this.router.navigate(['prepare-login'], {
            //   state: {
            //     message: res.message,
            //     requestId: res.requestId,
            //   }
            // });
            // localStorage.setItem('message', res.message)
            // localStorage.setItem('typeMfa', res.typeMfa)
            // localStorage.setItem('requestId', res.requestId)
            // localStorage.setItem('token', res.token)

          } else {
            this.router.navigate(['dashboard']);
          }
        },
          (err: any) => {
            this.error(err);
          }
        )
      } else {
        this.error(res.message);
        // this.form.reset();
      }
    },
      (err: any) => {
        console.log(err);
        
        this.error(err.error.message);
        this.form.reset();
      }
    )
  }

  error(message: string) {
    this._snackBar.open(message, 'Again', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 2000);
  }

}
