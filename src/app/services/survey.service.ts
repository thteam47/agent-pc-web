import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Survey, SurveyResult } from '../interface/survey';
import { SiblingService } from './sibling.service';

const host = window.location.hostname
const apiUrl = 'http://' + host + ':15001';
@Injectable({
  providedIn: 'root'
})


export class SurveyService {


  constructor(private httpClient: HttpClient, private sibling: SiblingService) { }

  getData(domainId: string) {
    const token = localStorage.getItem('tokenAgent');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/get_survey_by_tenant/${domainId}?ctx.domain_id=${domainId}`, httpOptions).pipe();
  }
  getSurveyByUser() {
    const token = localStorage.getItem('tokenAgent');
    return this.httpClient.get(`${apiUrl}/get_survey_by_user?ctx.token_agent=${token}`).pipe();
  }

  getSurveyByTenantId() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    return this.httpClient.get(`${apiUrl}/get_survey_by_tenant/${tenantId}?ctx.token_agent=${token}`).pipe();
  }

  getCategoryByReommendTenant() {
    const token = localStorage.getItem('tokenAgent');
    return this.httpClient.get(`${apiUrl}/get_categories_by_recommend_tenant?ctx.token_agent=${token}`).pipe();
  }

  getSurveyByTenant() {
    const token = localStorage.getItem('tokenAgent');
    return this.httpClient.get(`${apiUrl}/get_survey_by_tenant_id?ctx.token_agent=${token}`).pipe();
  }

  getRequestGenarateRecommendUserCbf(result: SurveyResult) {
    const token = localStorage.getItem('tokenAgent');
    
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
      "process_data": result,
    });
    console.log(body);
    
    return this.httpClient.post(`${apiUrl}/request_genarate_recommend/user/cbf`, body).pipe();
  }

  getRequestGenarateRecommendUserCf(result: SurveyResult) {
    const token = localStorage.getItem('tokenAgent');
    
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
      "process_data": result,
    });
    console.log(body);
    
    return this.httpClient.post(`${apiUrl}/request_genarate_recommend/user/cf`, body).pipe();
  }
}
