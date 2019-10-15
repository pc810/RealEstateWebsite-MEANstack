import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject<string>(null);
  currentMessage=this.messageSource.asObservable();

  changeMessage(userid:string)
  {
    this.messageSource.next(userid);
  }
  constructor() { }
}
