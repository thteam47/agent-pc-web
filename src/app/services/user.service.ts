import { changeRole } from '../interface/changeRole';
import { ifUser } from '../interface/ifUser';
import { SiblingService } from 'src/app/services/sibling.service';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interface/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { changePas } from '../interface/pass';
import { AuthenInfo } from '../interface/authenInfo';
import { Mfas } from '../interface/mfas';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
}

const host = window.location.hostname
const apiUrl = 'http://'+host+':15001';
@Injectable({
  providedIn: 'root'
})

export class UserService {  
  accessToken:string = "";
  constructor(private httpClient: HttpClient,private sibling: SiblingService) { }
  loginAdmin(authenInfo: AuthenInfo) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
    console.log(authenInfo);
    
    let body = JSON.stringify(authenInfo);
    return this.httpClient.post(`${apiUrl}/login`, body, httpOptions).pipe();
  }
  register(user: User) {
    let body = JSON.stringify(user);
    return this.httpClient.post(`${apiUrl}/identity-authen-api/registers`, body, httpOptions).pipe();
  }
  verifyUser(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/identity-authen-api/verify-user`, httpOptions).pipe();
  }
  verifyToken(token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/identity-authen-api/verify-forgot-password`, httpOptions).pipe();
  }
  approveUser(id: string, status: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      "userId": id,
      "status": status,
    });
    return this.httpClient.post(`${apiUrl}/identity-api/users/approve`, body, httpOptions).pipe();
  }
  prepareLogin(token:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    if (token === "") {
      token = localStorage.getItem('tokenAgent') || "";
    }
    let body = JSON.stringify({
      ctx: {
        token_agent: token,
      },
    });
    return this.httpClient.post(`${apiUrl}/prepare_login`, body,httpOptions).pipe();
  }
  forgotPassword(loginname:string) {
    let body = JSON.stringify({"data": loginname});
    return this.httpClient.post(`${apiUrl}/identity-authen-api/forgot_password`, body, httpOptions).pipe();
  }
  updatePassword(password: string, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      "password": password,
    });
    return this.httpClient.post(`${apiUrl}/identity-authen-api/forgot_password/update`, body, httpOptions).pipe();
  }
  logoutUser(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.httpClient.get(`${apiUrl}/identity-authen-api/logout`, httpOptions).pipe();
  }
  getUser(){
    const token = localStorage.getItem('tokenAgent') || "";
    return this.httpClient.get(`${apiUrl}/users?ctx.token_agent=${token}`).pipe();
  }
  changePassUser(pass:changePas, id: string){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(pass);
    return this.httpClient.put(`${apiUrl}/changePasswordUser/${id}`,body, httpOptions).pipe();
  }
  updateUser(info:ifUser, id: string){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(info);
    return this.httpClient.put(`${apiUrl}/identity-api/users/info/${id}`,body, httpOptions).pipe();
  }
  getAllUser(){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/identity-api/users/getAll`, httpOptions).pipe();
  }
  deleteUser(id:string){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.delete(`${apiUrl}/identity-api/users/${id}`, httpOptions).pipe();
  }
  addUser(data: User){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(data);
    return this.httpClient.post(`${apiUrl}/addUser`,body, httpOptions).pipe();
  }
  changeRole(data: changeRole,id: string){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      "data": data,
    });
    return this.httpClient.put(`${apiUrl}/identity-api/users/role/${id}`,body, httpOptions).pipe();
  }
  updateMfa(data: Array<Mfas>,id: string){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      "mfas": data,
    });
    return this.httpClient.put(`${apiUrl}/identity-authen-api/update_mfa/${id}`,body, httpOptions).pipe();
  }
}
