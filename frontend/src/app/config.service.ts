import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  imagesUrl: string = "assets/images";
  dataUrl: string = "assets/data";

  constructor() { }

}
