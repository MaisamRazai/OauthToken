import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable,of } from 'rxjs';
import { catchError,map,tap } from 'rxjs/operators';
import { User } from './user';
import { AdalConfig,Authentication } from 'adal-typescript'
import { logging } from 'protractor';
import { Token } from './token';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(
    private http: HttpClient
  ) {

  }
  getUsers(): Observable<Array<User>> {
    const url = 'https://graph.microsoft.com/v1.0/users';
    let tokoy = '';
    this.getToken().subscribe(token => {
      console.log('the token is',token);
      tokoy = token.access_token;
    })
    return this.http.get<Array<User>>(url,{
      headers: {
        'Authorization': 'bearer ' + tokoy
      }
    });
  }

  getToken(): Observable<Token> {
    const url = 'https://login.microsoftonline.com/40b1f774-8494-498a-8ccd-ab0b51134576/oauth2/token';
    const body = new FormData();
    body.append('client_id','06608ffc-e144-4400-95ef-e8426bba053c');
    body.append('client_secret','aaxQw/I[p0l9aAfY@CjZbD-v5T2*@l]0');
    body.append('Reource','https://graph.microsoft.com');
    body.append('grant_type','client_credentials');

    return this.http.post<Token>(url,body,{
      headers: {
        'Content-Typpe': 'application/json'
      }
    })
  }
}

