import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';

import { Socket } from '../shared/interfaces';

declare var io: {
    connect(url: string): Socket;
};

@Injectable()
export class DataService {

    socket: Socket;
    observer: Observer<Object>;

    local_url = 'http://localhost:2030';
    server_url = 'http://139.59.74.175:2030';

    getLocations(): Observable<Object> {
        this.socket = socketIo(this.local_url);

        this.socket.on('data', (res) => {
            this.observer.next(res.data);
        });

        return this.createObservable();
    }

    createObservable(): Observable<Object> {
        return new Observable<Object>(observer => {
            this.observer = observer;
        });
    }

    private handleError(error) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Socket.io server error');
    }

}
