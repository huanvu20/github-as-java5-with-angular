import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const apiUrl1 = "https://5e79b4f917314d0016133401.mockapi.io/account";
@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    return this.http.get<any>(apiUrl1);
  }
  getAccountById(accountId): Observable<any> {
    let url = `${apiUrl1}/${accountId}`;
    return this.http.get<any>(url);
  }
  updateAccount(accountObject,id): Observable<any> {
    let url = `${apiUrl1}/${id}`;
    return this.http.put<any>(url, accountObject);
  }
}
