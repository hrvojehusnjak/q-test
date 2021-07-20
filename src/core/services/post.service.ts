import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs'
import { concatMap, finalize, map, shareReplay, tap } from 'rxjs/operators'
import { PostExtended, PostWithComments, User } from '../models/models'
import { UsersService } from './user.service'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'
const defaultParams = {
  _embed: 'comments'
}

interface SearchOptions {
  _page: number
  _limit: number
  q: string
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private _posts: BehaviorSubject<PostWithComments[]> = new BehaviorSubject<
    PostWithComments[]
  >([])
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  )
  private _areAllResultsLoaded: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false)
  private searchOptions: SearchOptions = {
    _page: 1,
    _limit: 20,
    q: ''
  }

  public readonly posts$: Observable<PostWithComments[]> =
    this._posts.asObservable()
  public readonly isLoading$: Observable<boolean> =
    this._isLoading.asObservable()
  public readonly areAllResultsLoaded$: Observable<boolean> =
    this._areAllResultsLoaded.asObservable()

  constructor(private http: HttpClient, private usersService: UsersService) {}

  public getPosts(
    params: Partial<SearchOptions> = {},
    isLoadMore = false
  ): Observable<PostWithComments[]> {
    let httpParams = new HttpParams()
    if (isLoadMore) {
      this.searchOptions._page++
    } else {
      this.searchOptions._page = 1
      this.searchOptions.q = params.q || ''
    }

    httpParams = httpParams.appendAll({
      ...defaultParams,
      ...this.searchOptions,
      ...params
    })

    const posts$ = this.http
      .get<PostWithComments[]>(BASE_URL, { params: httpParams })
      .pipe(
        tap((posts) => {
          if (isLoadMore) {
            this._posts.next([...this._posts.getValue(), ...posts])
          } else {
            this._posts.next([...posts])
          }
          if (posts.length < this.searchOptions._limit) {
            this._areAllResultsLoaded.next(true)
          } else {
            this._areAllResultsLoaded.next(false)
          }
        })
      )

    return of(null).pipe(
      tap(() => this._isLoading.next(true)),
      concatMap(() => posts$),
      finalize(() => this._isLoading.next(false))
    )
  }

  public getPostById(id: number): Observable<PostWithComments> {
    let httpParams = new HttpParams()
    httpParams = httpParams.appendAll({ ...defaultParams })

    const post$ = this.http.get<PostWithComments>(`${BASE_URL}/${id}`, {
      params: httpParams
    })

    return of(null).pipe(
      tap(() => this._isLoading.next(true)),
      concatMap(() => post$),
      finalize(() => this._isLoading.next(false))
    )
  }
}
