import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SiblingService } from './sibling.service';



const host = window.location.hostname
const apiUrl = 'http://'+host+':15001';
@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private httpClient: HttpClient, private sibling: SiblingService) { }

  getTenants() {
    const token = localStorage.getItem('tokenAgent');
    return this.httpClient.get(`${apiUrl}/tenants/get_all?ctx.token_agent=${token}`).pipe();
  }

  addTenant(name: string, domain: string) {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify({
      data: {
        name: name,
        domain: domain,
      }
    });
    return this.httpClient.post(`${apiUrl}/default/tenants`, body, httpOptions).pipe();
  }

}
