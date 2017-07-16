import { Component, OnInit } from '@angular/core';
import { MenuService} from '../menu/menu.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
  providers: [MenuService]  
})
export class TopNavigationComponent implements OnInit {

  handleMouseEnter: (event) => void;
  handleMouseLeave: (event) => void;

  constructor(public menu: MenuService) {
    var vm = this;
    this.menu.get()
      .subscribe(data => {
        this.menu = data;
      });

    this.handleMouseEnter = function(event) {
      console.log('handleMouseEnter');
    }      

    this.handleMouseLeave = function(event) {
      console.log('handleMouseLeave');
    }       
  }

  ngOnInit() {
  }

}
