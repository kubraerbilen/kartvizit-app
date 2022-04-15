import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards !: Card[];

  Url : string = "https://demo.limantech.com/cards/public/api";
  constructor(
    @Inject('apiUrl') private apiUrl : string , 
    private http: HttpClient
  ) { }

  getCards(): void {
     this.http.get<Card[]>( this.Url +'/cards').subscribe((res:Card[]) => {
      this.cards = res;
    });
  }

  addCard(cards : Card) : Observable<any> {
    return this.http.post(this.Url + '/cards',cards) ;
  }

  updateCard(card : Card , cardId : number) : Observable<any> {
  return this.http.put(this.Url + '/cards/' + cardId  , card);
  }

  deleteCard(cardId : number) : Observable<any>{
    return this.http.delete(this.Url + '/cards/' + cardId );
  }
}
