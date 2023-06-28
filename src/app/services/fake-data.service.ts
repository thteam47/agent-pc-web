import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SiblingService } from './sibling.service';



const host = window.location.hostname
const apiUrl = 'http://'+host+':15001';
@Injectable({
  providedIn: 'root'
})

export class FakeDataService {

  constructor(private httpClient: HttpClient, private sibling: SiblingService) { }

  genKey() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/fake/key_info/${tenantId}`, body).pipe();
  }

  doSurvey() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/do_survey/${tenantId}`, body).pipe();
  }

  sendDataOnePart() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/send_process_data/survey/one_part/${tenantId}`, body).pipe();
  }

  sendDataTwoPart3() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/send_process_data/survey/phase3_two_part/${tenantId}`, body).pipe();
  }

  sendDataTwoPart4() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/send_process_data/survey/phase4_two_part/${tenantId}`, body).pipe();
  }

  sendDataTwoPart5() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/send_process_data/survey/phase5_two_part/${tenantId}`, body).pipe();
  }

  sendDataTwoPart() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/process_data/survey_2/${tenantId}`, body).pipe();
  }

  processData() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/process_data/survey/${tenantId}`, body).pipe();
  }

  processData2() {
    const token = localStorage.getItem('tokenAgent');
    const tenantId = localStorage.getItem('tenantId');
    let body = JSON.stringify({
      "ctx": {
        token_agent: token,
      },
    });
    
    return this.httpClient.post(`${apiUrl}/process_data/survey_2/${tenantId}`, body).pipe();
  }

}
