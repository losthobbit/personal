import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuService {

  constructor(private http: Http) { 
  }

  get() {
    var url = "/assets/data/menu.json";
    return this.http.get(url)
      .map((res) => res.json());
  }
}

