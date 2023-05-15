import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  constructor(
    private gifsService: GifsService,
  ){}

  get tags():string[]{ // los get son una property, como si fuese: public service: string[]= []
    return this.gifsService.tagsHistory;
  }

  newSearchTag(tag:string):void{
    this.gifsService.seachTag(tag)
  }

}
