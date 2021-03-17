import {Injectable} from '@angular/core';
import {Message} from './message';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MessageService {
  private currentMessage = new Subject<Message>();

  reportMessage(msg: Message) {
    this.currentMessage.next(msg);
  }

  get messages(): Observable<Message> {
    return this.currentMessage;
  }
}
