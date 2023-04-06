import {  Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SocketClientService {

    public socket = io('http://localhost:3000');
    public data$:  BehaviorSubject<any> = new BehaviorSubject('');

    public constructor() {}

    public getNewData() {
        this.socket.on('data', (data: any) => {
            this.data$.next(data);
        });
        return this.data$.asObservable();
    }

    public sendData(data: any) {
        console.log('sendMessage: ', data);
        this.socket.emit('sendMessage', data);
    }
   

}