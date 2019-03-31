import { Component, OnInit, Input } from '@angular/core';
import { MenuService} from '../menu/menu.service';
import { ConfigService } from '../config.service';
import { MenuItem } from '../menu/menuItem';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-top-navigation-2',
  templateUrl: './top-navigation-2.component.html',
  styleUrls: ['./top-navigation-2.component.scss'],
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
export class TopNavigation2Component implements OnInit {

  handleMouseEnter: (event, menuItem, isSubMenuItem: boolean) => void;
  handleMouseLeave: () => void;

  private image1:boolean = false;
  private menuItem1:boolean = false;
  
  preloadedImages:HTMLImageElement[] = [];
  menuItems:[MenuItem];
  subMenuItems:[MenuItem];
  previewImageState:string = "out";
  subMenuState:string = "out";
  subMenuState2:string = "out";
  image2Shown:string = "show";
  menuItemLeft:string = "0px";
  menuItemLeft2:string = "0px";
  lastMainMenu:MenuItem;
  currentMenuItem:MenuItem;

  constructor(public menuService: MenuService, public configService: ConfigService) {
    var vm = this;
    this.menuService.get()
      .subscribe(data => {
        this.menuItems = data.items;
        this.preloadMenuImages(data);
      });

    this.handleMouseEnter = function(event, menuItem, isSubMenuItem: boolean) {
      this.currentMenuItem = menuItem;
      if(!isSubMenuItem) {       
        if(this.lastMainMenu === menuItem){
          return;
        }
        this.lastMainMenu = menuItem;
        this.menuItem1 = !this.menuItem1;
        if(this.menuItem1) {
          this.subMenuItems = menuItem.subMenu;
          this.menuItemLeft = event.target.offsetLeft + "px";
        }
        else {
          this.subMenuItems2 = menuItem.subMenu;
          this.menuItemLeft2 = event.target.offsetLeft + "px";
        }
        // For some reason I need the timeout for the animation to work properly
        setTimeout(() => {
          if(menuItem.subMenu) {
            this.subMenuState = this.menuItem1 ? "in" : "out";
            this.subMenuState2 = this.menuItem1 ? "out" : "in";
          }
          else {
            this.subMenuState = "out";
            this.subMenuState2 = "out";
          }     
        }, 1); 
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
      this.currentMenuItem = null;
      setTimeout(() => {
        if(this.currentMenuItem == null){
          this.subMenuState = "out";
          this.subMenuState2 = "out";
          this.image1Shown = "hide";
          this.image2Shown = "hide";
          this.previewImageState = "out";
          this.lastMainMenu = null;                 
        }
      }, 500);      
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
