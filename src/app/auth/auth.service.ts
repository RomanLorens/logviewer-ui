import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User> = this.http.get<User>(`/${environment.context}/auth/current-user`).pipe(shareReplay(1))

  constructor(private http: HttpClient) { }

  currentUser(): Observable<User> {
    return this.user$
  }

 
}
