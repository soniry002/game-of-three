import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient) { }

  callAPI(num: number) {
    const seq = this.http.get('http://localhost:3000/GetNextNumFromPlayer/' + num);
    return seq;
  }
}
