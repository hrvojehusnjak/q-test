import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core'
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  fromEvent,
  Observable,
  Subject
} from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators'
import { PostsService } from 'src/core/services/post.service'
import { UsersService } from 'src/core/services/user.service'
import { PostExtended, User } from 'src/core/models/models'

@Component({
  selector: 'app-posts-index',
  templateUrl: './posts-index.component.html',
  styleUrls: ['./posts-index.component.scss']
})
export class PostsIndexComponent implements AfterViewInit, OnDestroy {
  public posts$: Observable<PostExtended[]>
  public isLoading$: Observable<boolean>
  public areAllPostsLoaded$: Observable<boolean>
  public searchTerm$ = new BehaviorSubject<string>('')
  @ViewChild('search') searchInput!: ElementRef<HTMLInputElement>

  private readonly _destroy = new Subject<boolean>()

  constructor(
    public postsService: PostsService,
    private usersService: UsersService
  ) {
    forkJoin([
      this.usersService.getUsers(),
      this.postsService.getPosts()
    ]).subscribe()

    this.isLoading$ = combineLatest([
      this.postsService.isLoading$,
      this.usersService.isLoading$
    ]).pipe(
      map(
        ([arePostsLoading, areUsersLoading]) =>
          arePostsLoading || areUsersLoading
      )
    )

    this.posts$ = combineLatest([
      this.postsService.posts$,
      this.usersService.users$,
      this.isLoading$
    ]).pipe(
      filter(([, , isLoading]) => !isLoading),
      map(([posts, users]) =>
        posts.map((post) => ({
          ...post,
          user: users.find((user) => user.id === post.userId) as User
        }))
      )
    )
    this.areAllPostsLoaded$ = this.postsService.areAllResultsLoaded$
  }

  ngAfterViewInit(): void {
    const search$ = fromEvent(this.searchInput.nativeElement, 'input')
    search$
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => this.postsService.getPosts({ q: term }, false)),
        takeUntil(this._destroy)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this._destroy.next()
    this._destroy.complete()
  }

  onLoadMorePosts(): void {
    this.postsService.getPosts({}, true).subscribe()
  }
}
