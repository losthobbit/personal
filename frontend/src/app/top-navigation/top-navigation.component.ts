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
      transition('out => in', animate("500ms ease-in")),
      transition('in => out', animate("1000ms ease-in"))
    ]),
    trigger('topMargin', [
      state('in', style({marginTop: '2px', opacity:1})),
      state('out', style({marginTop: '400px', opacity:0})),
      transition('out => in', animate("500ms ease-out")),
      transition('in => out', animate("500ms ease-in"))
    ]),     
    trigger('showHide', [
      state('show', style({opacity:1})),
      state('hide', style({opacity:0})),
      transition('hide => show', animate("500ms ease-in")),
      transition('show => hide', animate("1000ms ease-in"))
    ])    
  ]  
})
export class TopNavigationComponent implements OnInit {

  handleMouseEnter: (event, menuItem, isSubMenuItem: boolean) => void;
  handleMouseLeave: () => void;

  private image1:boolean = false;

  preloadedImages:HTMLImageElement[] = [];
  menuItems:[MenuItem];
  subMenuItems:[MenuItem];
  previewImageState:string = "out";
  subMenuState:string = "out";
  menuItemLeft:string = "0px";
  lastMainMenu:MenuItem;
  leavingMenuItem:boolean = false;
  currentMenuItem:MenuItem;
  image2Shown:string = "show";

  constructor(public menuService: MenuService, public configService: ConfigService) {
    var vm = this;
    this.menuService.get()
      .subscribe(data => {
        this.menuItems = data.items;
        this.preloadMenuImages(data);
      });

    this.handleMouseEnter = function(event, menuItem, isSubMenuItem: boolean) {
      this.currentMenuItem = menuItem;
      this.leavingMenuItem = false;
      if (isSubMenuItem) {
      } else {
        menuItem.left = event.target.offsetLeft + "px";
        if(menuItem.image) {
          if(this.image1) {
            this.previewImage2 = this.configService.imagesUrl + '/' + menuItem.image;
            this.image2Shown = "show";
          }
          else {
            this.previewImage1 = this.configService.imagesUrl + '/' + menuItem.image;
            this.image2Shown = "hide";
          }
          this.image1 = !this.image1;
          this.previewImageState = "in";       
        }         
      }
      if(menuItem.image) {
        if(this.image1) {
          this.previewImage2 = this.configService.imagesUrl + '/' + menuItem.image;
          this.image2Shown = "show";
        }
        else {
          this.previewImage1 = this.configService.imagesUrl + '/' + menuItem.image;
          this.image2Shown = "hide";
        }
        this.image1 = !this.image1;
        this.previewImageState = "in";       
      }         
    }      

    this.handleMouseLeave = function() {
      this.leavingMenuItem = true;
      setTimeout(() => {
        if(this.leavingMenuItem){
          this.currentMenuItem = null;
          this.pendingMenuItem = false;
          this.image1Shown = "hide";
          this.image2Shown = "hide";
          this.previewImageState = "out";
        }
      }, 500);     
    }       
  }

  getSubMenuState(menuItem): string {
    return menuItem == this.currentMenuItem ? "in" : "out";
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
