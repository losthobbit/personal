import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config.service';

@Injectable()
export class MenuService {

  constructor(private http: Http, public configService: ConfigService) { 
  }

  get() {
    var url = this.configService.dataUrl + "/menu.json";
    return this.http.get(url)
      .map((res) => res.json());
  }
}

