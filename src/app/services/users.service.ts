import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';
import { IUser } from '../interfaces/IUser';

interface ILoginUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);

  private loggedIn$ = this.loggedIn.asObservable();
  private isAdmin$ = this.isAdmin.asObservable();

  getLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }

  setLoggedIn(latestValue: boolean) {
    return this.loggedIn.next(latestValue);
  }
  getAdmin(): Observable<boolean> {
    return this.isAdmin$;
  }

  setAdmin(latestValue: boolean) {
    return this.isAdmin.next(latestValue);
  }

  URL = 'https://sportio-backend.herokuapp.com/users';

  constructor(private _http: HttpClient) {}

  register(userDetails: IUser): Observable<IUser> {
    const user = this._http
      .post<IUser>(`${this.URL}/register`, userDetails, {
        withCredentials: true,
      })
      .pipe();
    return user;
  }
  login(userDetails: ILoginUser): Observable<ILoginUser> {
    const user = this._http
      .post<ILoginUser>(`${this.URL}/login`, userDetails, {
        withCredentials: true,
      })
      .pipe();

    return user;
  }

  logout(): Observable<string> {
    return this._http
      .get<string>(`${this.URL}/logout`, {
        withCredentials: true,
      })
      .pipe();
  }

  getAllUsers(): Observable<IUser[]> {
    const users = this._http
      .get<IUser[]>(this.URL, {
        withCredentials: true,
      })
      .pipe();
    return users;
  }
}
