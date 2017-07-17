import { Component, OnInit, Input } from '@angular/core';
import { MenuService} from '../menu/menu.service';
import { ConfigService } from '../config.service';
import { MenuItem } from '../menu/menuItem';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
  providers: [],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      state('out', style({transform: 'translateX(-100%)'})),
      transition('out => in', animate("300ms ease-out")),
      transition('in => out', animate("300ms ease-in"))
    ]),
    trigger('showHide', [
      state('show', style({opacity:1})),
      state('hide', style({opacity:0})),
      transition('hide => show', animate("300ms ease-in")),
      transition('show => hide', animate("300ms ease-out"))
    ])    
  ]  
})
export class TopNavigationComponent implements OnInit {

  handleMouseEnter: (event, menuItem) => void;
  handleMouseLeave: (event) => void;

  private image1:boolean = false;
  
  preloadedImages:HTMLImageElement[] = [];
  menuItems:[MenuItem];
  previewImageState:string = "out";
  image2Shown:string = "show";

  constructor(public menuService: MenuService, public configService: ConfigService) {
    var vm = this;
    this.menuService.get()
      .subscribe(data => {
        this.menuItems = data.items;
        this.preloadMenuImages(data);
      });

    this.handleMouseEnter = function(event, menuItem) {
      if(menuItem.image) {
        if(this.image1)
        {
          this.previewImage2 = this.configService.imagesUrl + '/' + menuItem.image;
          this.image2Shown = "show";
        }
        else
        {
          this.previewImage1 = this.configService.imagesUrl + '/' + menuItem.image;
          this.image2Shown = "hide";
        }
        this.image1 = !this.image1;
        this.previewImageState = "in";
      }
    }      

    this.handleMouseLeave = function(event) {
      this.previewImageState = "out";
    }       
  }

  preloadMenuImages(data){
    this.preloadImages(
      data.items
        .filter(item => item.image)
        .map(item => this.configService.imagesUrl + '/' + item.image)
    );
  }

  preloadImages(array) {
    var list:HTMLImageElement[] = this.preloadedImages;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(<HTMLImageElement>this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
  }

  ngOnInit() {
  }

}
