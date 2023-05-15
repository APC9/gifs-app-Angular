import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, Giphy } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'nGQW3pTAsM2H60LlflkpQFKMWr7o74pM';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(
    private http: HttpClient,
  ) {
    this.getLocalStorage()
  }

  get tagsHistory():string[] {
    return [...this._tagsHistory];
  }

  seachTag( tag: string ):void {
    if ( tag.length === 0)  return;
    this.organizeHistory(tag)

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q', tag )

    this.http.get<Giphy>(`${this.serviceUrl}/search`, {params})
      .subscribe( resp =>  {
        this.gifList = resp.data;
      })

  }

  private saveLocalStorage(): void {
    localStorage.setItem('Gifs-history', JSON.stringify(this._tagsHistory))
  }

  private getLocalStorage():void{
    const gifsLocal = JSON.parse(localStorage.getItem('Gifs-history')!)

    if (gifsLocal){
      this._tagsHistory = gifsLocal
      const lastTag = this._tagsHistory[0]
      this.seachTag(lastTag)
    }

  }

  private organizeHistory(tag:string){
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag) ){
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag );
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice( 0, 10 )
    this.saveLocalStorage()

  }

}
