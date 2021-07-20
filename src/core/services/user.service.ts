import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '../models/models'
import { concatMap, finalize, shareReplay, tap } from 'rxjs/operators'
import { BehaviorSubject, Observable, of } from 'rxjs'

const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

@Injectable({ providedIn: 'root' })
export class UsersService {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  )

  public readonly users$: Observable<User[]> = this._users.asObservable()
  public readonly isLoading$: Observable<boolean> =
    this._isLoading.asObservable()

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    const users$ = this.http
      .get<User[]>(BASE_URL)
      .pipe(tap((users) => this._users.next(users)))

    return of(null).pipe(
      tap(() => this._isLoading.next(true)),
      concatMap(() => users$),
      finalize(() => this._isLoading.next(false))
    )
  }
}
